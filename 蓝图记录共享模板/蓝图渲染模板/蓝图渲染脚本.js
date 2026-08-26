'use strict';
/* ============================================================
 * 蓝图记录 · 渲染脚本（共享）
 * 作用：读取"当前渲染笔记"里的蓝图源码子笔记，用 blueprintUE
 *       渲染引擎(render.js/render.css)在模板里绘出节点图。
 * 关键 API：api.originEntity = 承载 ~renderNote 的那个渲染笔记(当前蓝图记录)
 *          api.currentNote    = 本脚本所在笔记（__FILE__），用于上溯定位资产库
 * 资产来源：从 库书下的「蓝图渲染资产」子笔记读取 render.js / render.css。
 * 交互：纯滚轮缩放（render.js 已改为不依赖 Ctrl）；刷新由 Trilium 渲染笔记自带。
 * ============================================================ */
(function() {
  var MAX_WAIT_CONTAINER = 5000; // 最长等待容器出现的时间（毫秒）
  var MAX_WAIT_ENGINE = 3000; // 最长等待渲染引擎初始化的时间（毫秒）

  function getScope() {
    if (api.$container && api.$container[0]) return api.$container[0];
    var scope = document.querySelector('.render-note-scope');
    if (scope) return scope;
    return document.body;
  }

  function getContainer() {
    var scope = getScope();
    var container = scope.querySelector('#bp-container');
    return container || document.getElementById('bp-container');
  }

  function whenContainerReady(callback, maxWait) {
    var startTime = Date.now();
    maxWait = maxWait || MAX_WAIT_CONTAINER;

    function check() {
      var container = getContainer();
      if (container) {
        callback();
        return;
      }
      if (Date.now() - startTime < maxWait) {
        requestAnimationFrame(check);
      } else {
        console.warn('[蓝图渲染] bp-container 未在', maxWait, 'ms 内就绪');
      }
    }
    requestAnimationFrame(check);
  }

  function ensureBlueprintUE(callback, maxWait) {
    maxWait = maxWait || MAX_WAIT_ENGINE;
    var startTime = Date.now();

    function check() {
      if (window.blueprintUE && window.blueprintUE.render && window.blueprintUE.render.Main) {
        callback();
      } else if (Date.now() - startTime < maxWait) {
        setTimeout(check, 50);
      } else {
        showErr('渲染引擎初始化超时');
      }
    }
    check();
  }

  function showErr(msg) {
    var c = getContainer();
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

      function isDescendantOf(noteId, rootId) {
        if (!noteId || !rootId) return false;
        var cur = null, depth = 0;
        try { cur = api.getNote(noteId); } catch (e) { return false; }
        while (cur && depth < 30) {
          if (cur.noteId === rootId) return true;
          var ps = cur.getParentNotes();
          if (!ps || !ps.length) return false;
          cur = ps[0]; depth++;
        }
        return false;
      }

      var rn = rnId ? api.getNote(rnId) : null;
      if (!rn && curId) { try { rn = api.getNote(curId).getParentNotes()[0].getParentNotes()[0]; } catch (e) {} }
      if (!rn) return { error: '无法定位渲染笔记（蓝图的承载笔记）' };

      var text = '';
      var kids = rn.getChildNotes() || [];
      for (var i = 0; i < kids.length; i++) {
        if (kids[i].type === 'code') {
          var c = dec(kids[i].getContent());
          if (c) { text = c; break; }
        }
      }
      if (!text) {
        var lbl = rn.getLabelValue('blueprintText');
        if (lbl && isDescendantOf(lbl, rn.noteId)) {
          var ln = api.getNote(lbl);
          if (ln) text = dec(ln.getContent());
        }
      }
      if (!text) return { error: '蓝图源码为空（请在渲染笔记下的 code 子笔记中粘贴 UE 复制节点的文本）' };

      var assets = { css: '', js: '' };
      var book = null;
      if (curId) { try { book = api.getNote(curId).getParentNotes()[0].getParentNotes()[0]; } catch (e) {} }

      if (book) {
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

  function injectAssets(css, js, onReady) {
    try {
      if (css && !document.getElementById('bue-render-css')) {
        var st = document.createElement('style');
        st.id = 'bue-render-css';
        st.textContent = css;
        document.head.appendChild(st);
      }
      if (js) {
        try { if (window.blueprintUE) delete window.blueprintUE; } catch (e) {}
        var sc = document.createElement('script');
        sc.textContent = js;
        document.head.appendChild(sc);
        if (onReady) ensureBlueprintUE(onReady);
      } else if (onReady) {
        onReady();
      }
    } catch (e) { console.error('injectAssets failed', e); }
  }

  function getPaneHeight() {
    try {
      var scope = (api.$container && api.$container[0]) ? api.$container[0] : document.querySelector('.render-note-scope');
      if (scope && scope.closest) {
        var embed = scope.closest('section.include-note');
        if (embed && embed.clientHeight) return embed.clientHeight;
        var scroller = scope.closest('.scrolling-container');
        if (scroller && scroller.clientHeight) return scroller.clientHeight;
      }
    } catch (e) {}
    return window.innerHeight || 600;
  }

  function doRender(sourceText) {
    var container = getContainer();
    if (!container) return;
    try {
      if (container.__bpInst) { try { container.__bpInst.stop(); } catch (e) {} container.__bpInst = null; }
      container.innerHTML = '';
      if (!sourceText) { showErr('蓝图源码为空'); return; }
      if (!(window.blueprintUE && window.blueprintUE.render && window.blueprintUE.render.Main)) { showErr('渲染引擎(render.js)未加载'); return; }
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
      var cc = getContainer();
      if (cc) { cc.__text = r.text; cc.__rendered = true; }
      injectAssets(r.css, r.js, function() {
        doRender(r.text);
      });
    }).catch(function(e) { showErr(e && e.message ? e.message : e); console.error(e); });
  }

  whenContainerReady(function() {
    var ccGu = getContainer();
    if (ccGu) ccGu.addEventListener('contextmenu', function(e) { if (e) e.preventDefault(); });
    refresh();
    var rt = null;
    window.addEventListener('resize', function() {
      clearTimeout(rt);
      rt = setTimeout(function() {
        var cc = getContainer();
        if (cc && cc.__rendered) doRender(cc.__text);
      }, 200);
    });
  });
})();