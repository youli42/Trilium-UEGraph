# 蓝图记录共享模板 · 结构 / 配置 / 使用

一个用于**记录并展示 UE 蓝图节点图**的 Trilium 共享模板。把 UE 编辑器里「复制节点」得到的文本当作一份 **代码笔记** 保存，本模板会在渲染笔记里自动绘出对应的节点图。

## 目录说明（本仓库）

| 文件 | 对应 Trilium 笔记 | 作用 |
|---|---|---|
| `蓝图渲染模板.html` | 蓝图渲染模板 (code/text/html) | 渲染界面骨架（工具栏 + 画布 + 源码面板） |
| `蓝图渲染脚本.js` | 蓝图渲染脚本 (code/js) | 胶水逻辑：定位记录、读源码、注入引擎、绘制 |

渲染引擎 `render.js`/`render.css` 不在此仓库内，运行时由 `#renderAssetsDir` 指向的本地目录加载。

## 在 Trilium 中的完整结构

```
前端展示页面
 └─ 蓝图记录共享模板（text，模板库）
      ├─ #renderAssetsDir  label → 本地渲染引擎目录（如 F:\code\blueprintue-self-hosted-edition\www\bue-render）
      ├─ 蓝图渲染模板（code/text/html）   ← ~renderNote 的目标
      │    └─ 蓝图渲染脚本（code/js）     ← 胶水逻辑
      ├─ 蓝图渲染资产（text）
      │    ├─ render.js（可留占位）        ← 引擎回退来源
      │    └─ render.css（可留占位）
      └─ 演示·蓝图记录（render 笔记）      ← 打开即演示渲染
           ├─ ~renderNote → 蓝图渲染模板
           ├─ #blueprintText → 示例蓝图文本
           └─ 示例蓝图文本（code/text/plain）
```

## 关键要点

- **`~renderNote`**：render 笔记指向 `蓝图渲染模板` 的关系。可跨目录引用（放任何位置都行）。
- **`#blueprintText`（可选）**：指到「存源码的子 code 笔记」。若不设，自动取 render 笔记下第一个 code 子笔记作源码。
- **资产加载**：渲染脚本优先用 `fs` 读取 `#renderAssetsDir` 目录里的 `render.js`/`render.css`；读不到则回退到 `蓝图渲染资产` 下的同名笔记。

## 如何新建一张蓝图记录

1. 在目标目录新建一个 **render 笔记**（类型 render），命名如「某个蓝图」。
2. 在其下新建一个 **code 子笔记**（mime `text/plain`），命名为「蓝图文本」。
3. 把 UE 编辑器里「复制节点」得到的整段文本粘贴进该 code 子笔记。
4. 给 render 笔记加属性：
   - 关系 `~renderNote` → `蓝图渲染模板`。
   - （推荐）标签 `blueprintText` = 源码 code 子笔记的 noteId；不设则自动取第一个 code 子笔记。
5. 保存，打开 render 笔记即可看到节点图；可切「源码」查看、点「刷新」重画。

## 输入格式要求

必须是 UE 编辑器「复制节点」生成的 **T3D 文本**，形如：

```
Begin Object Class=/Script/BlueprintGraph.K2Node_Event ...
```

粘贴纯蓝图 JSON、`.uasset`、图片均不生效。格式不符时画布显示红色错误提示。

## 维护

- **升级渲染引擎**：替换 `#renderAssetsDir` 目录下的 `render.js`/`render.css`，或更新 `蓝图渲染资产` 里同名笔记（去掉占位内容）。
- **脱离本地目录**：把 `render.js`、`render.css` 完整内容粘贴进 `蓝图渲染资产` 下同名笔记（替换占位文本），再清空 `#renderAssetsDir`，实现完全自包含。
