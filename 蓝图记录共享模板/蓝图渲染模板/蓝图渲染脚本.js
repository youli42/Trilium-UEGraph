
'use strict';
/* ============================================================
 * 蓝图记录 · 渲染脚本（共享）
 * 作用：读取"当前渲染笔记"里的蓝图源码子笔记，用 blueprintUE
 *       渲染引擎(render.js/render.css)在模板里绘出节点图。
 * 关键 API：api.originEntity = 承载 ~renderNote 的那个渲染笔记(当前蓝图记录)
 *          api.currentNote    = 本脚本所在笔记（__FILE__），用于上溯定位资产库
 * 资产来源：优先从 库书上的 #renderAssetsDir 指向的本地目录读取（fs），
 *          否则回退读取 蓝图渲染资产 子笔记内容。
 * 交互：纯滚轮缩放（render.js 已改为不依赖 Ctrl）；刷新由 Trilium 渲染笔记自带。
 * ============================================================ */
(function() {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function showErr(msg) {
    var c = document.getElementById('bp-container');
    if (!c) return;
    c.innerHTML = '';
    var el = document.createElement('div');
    el.className = 'bp-error';
    el.textContent = '渲染失败：' + String(msg);
    c.appendChild(el);
  }

  function backendLoad(renderNoteId, currentId) {
    return api.runOnBackend(function(rnId, curId) {
      function dec(c) { return Buffer.isBuffer(c) ? c.toString('utf8') : String(c || ''); }

      // 1) 定位渲染笔记（当前蓝图记录）
      var rn = rnId ? api.getNote(rnId) : null;
      if (!rn && curId) { try { rn = api.getNote(curId).getParentNotes()[0].getParentNotes()[0]; } catch (e) {} }
      if (!rn) return { error: '无法定位渲染笔记（蓝图的承载笔记）' };

      // 2) 读取蓝图源码：优先 #blueprintText label，否则取第一个 code 子笔记
      var text = '';
      var lbl = rn.getLabelValue('blueprintText');
      if (lbl) { var ln = api.getNote(lbl); if (ln) { text = dec(ln.getContent()); } }
      if (!text) {
        var kids = rn.getChildNotes() || [];
        for (var i = 0; i < kids.length; i++) {
          if (kids[i].type === 'code') { text = dec(kids[i].getContent()); break; }
        }
      }
      if (!text) return { error: '未找到蓝图源码子笔记（请在渲染笔记下加 code 子笔记，或挂 #blueprintText = noteId）' };

      // 3) 资产：优先 fs 从 #renderAssetsDir 读取，否则回退到 蓝图渲染资产 子笔记
      var assets = { css: '', js: '' };
      var book = null;
      if (curId) { try { book = api.getNote(curId).getParentNotes()[0].getParentNotes()[0]; } catch (e) {} }

      var dir = (book && book.getLabelValue) ? book.getLabelValue('renderAssetsDir') : '';
      if (dir) {
        try {
          var fs = require('fs'), path = require('path');
          ['render.css', 'render.js'].forEach(function(f) {
            try {
              var p = path.join(dir, f);
              if (fs.existsSync(p)) assets[f] = fs.readFileSync(p, 'utf8');
            } catch (e) {}
          });
        } catch (e) {}
      }

      if ((!assets.css || !assets.js) && book) {
        (function walk(id, depth) {
          if (depth < 0) return;
          var n = api.getNote(id);
          if (!n) return;
          var ch = n.getChildNotes() || [];
          for (var j = 0; j < ch.length; j++) {
            if (ch[j].title === 'render.css' && !assets.css) {
              var v = dec(ch[j].getContent());
              if (v && v.indexOf('placeholder-') !== 0) assets.css = v;
            } else if (ch[j].title === 'render.js' && !assets.js) {
              var w = dec(ch[j].getContent());
              if (w && w.indexOf('placeholder-') !== 0) assets.js = w;
            }
            walk(ch[j].noteId, depth - 1);
          }
        })(book.noteId, 4);
      }

      return { text: text, css: assets.css || '', js: assets.js || '' };
    }, [renderNoteId, currentId]);
  }

  function injectAssets(css, js) {
    try {
      if (css && !document.getElementById('bue-render-css')) {
        var st = document.createElement('style');
        st.id = 'bue-render-css';
        st.textContent = css;
        document.head.appendChild(st);
      }
      if (js) {
        // 强制重载最新引擎，避免陈旧副本（如之前加载的 ctrl-required 版本）残留
        try { if (window.blueprintUE) delete window.blueprintUE; } catch (e) {}
        var sc = document.createElement('script');
        sc.textContent = js;
        document.head.appendChild(sc);
      }
    } catch (e) { console.error('injectAssets failed', e); }
  }

  // 获取 note 内容面板（.scrolling-container）的可视高度。
  // render 笔记不是 iframe、默认非 full-height：不能用 window.innerHeight（=整个应用窗口）
  // 或容器自身 clientHeight（=内容高度，会循环），必须量 .scrolling-container 这个滚动面板。
  function getPaneHeight() {
    try {
      var scope = (api.$container && api.$container[0]) ? api.$container[0] : document.querySelector('.render-note-scope');
      if (scope && scope.closest) {
        var scroller = scope.closest('.scrolling-container');
        if (scroller && scroller.clientHeight) return scroller.clientHeight;
      }
    } catch (e) {}
    return window.innerHeight || 600;
  }

  function doRender(sourceText) {
    var container = document.getElementById('bp-container');
    if (!container) return;
    try {
      if (container.__bpInst) { try { container.__bpInst.stop(); } catch (e) {} container.__bpInst = null; }
      container.innerHTML = '';
      if (!sourceText) { showErr('蓝图源码为空'); return; }
      if (!(window.blueprintUE && window.blueprintUE.render && window.blueprintUE.render.Main)) { showErr('渲染引擎(render.js)未加载'); return; }
      // 关键：高度=面板可视高度，既不会塌成 0（渲染消失），也不会比面板大（滚动条）。
      var h = Math.max(200, getPaneHeight());
      container.style.height = h + 'px';
      container.__bpInst = new window.blueprintUE.render.Main(sourceText, container, { height: h + 'px' });
      container.__bpInst.start();
    } catch (e) { showErr(e && e.message ? e.message : e); console.error(e); }
  }

  function refresh() {
    var renderNoteId = null;
    try { if (api.originEntity && api.originEntity.noteId) renderNoteId = api.originEntity.noteId; } catch (e) {}
    if (!renderNoteId) { try { if (api.startNote && api.startNote.noteId) renderNoteId = api.startNote.noteId; } catch (e) {} }
    var currentId = api.currentNote ? api.currentNote.noteId : '';

    backendLoad(renderNoteId, currentId).then(function(r) {
      if (r.error) { showErr(r.error); return; }
      injectAssets(r.css, r.js);
      var cc = document.getElementById('bp-container');
      if (cc) { cc.__text = r.text; cc.__rendered = true; }
      doRender(r.text);
    }).catch(function(e) { showErr(e && e.message ? e.message : e); console.error(e); });
  }

  ready(function() {
    refresh();
    var rt = null;
    // 视口变化时重新铺满
    window.addEventListener('resize', function() {
      clearTimeout(rt);
      rt = setTimeout(function() {
        var cc = document.getElementById('bp-container');
        if (cc && cc.__rendered) doRender(cc.__text);
      }, 200);
    });
  });
})();
