# Trilium_UEGraph

把 **UE 蓝图节点图** 记录到 Trilium、并以可视化方式展示的共享模板。

在 UE 编辑器里选中节点 → 右键 **复制(Copy)**，把得到的 **T3D 文本** 当作一份代码笔记保存。Trilium 中的渲染笔记会通过本模板（blueprintUE 渲染引擎）自动绘制出对应的节点图。

## 目录结构

```
Trilium_UEGraph/
 ├─ README.md                 项目说明（本文件）
 ├─ 蓝图记录共享模板/
 │    ├─ README.md            模板结构 / 配置 / 使用说明
 │    ├─ 蓝图渲染模板.html    Trilium 渲染界面骨架（全高画布，无工具栏）
 │    └─ 蓝图渲染脚本.js      胶水逻辑：定位记录、读源码、注入引擎、全高绘制
```

> 渲染引擎 `render.js` / `render.css`（blueprintUE 第三方资产）**不在此仓库内**，
> 运行时由 `#renderAssetsDir` 指向的本地目录加载（见 `蓝图记录共享模板/README.md`）。

## 在 Trilium 中的形态

任何一张「蓝图记录」都是：

```
某蓝图（render 笔记，类型 render）
 ├─ ~renderNote  关系 → 蓝图渲染模板
 ├─ #blueprintText 标签(可选) → 源码 code 子笔记
 └─ 蓝图文本（code 子笔记，mime text/plain）  ← 存 UE 复制的 T3D 文本
```

打开该 render 笔记即可看到节点图。详细步骤见 `蓝图记录共享模板/README.md`。

## 说明

- 输入必须是 UE 编辑器「复制节点」生成的 **T3D 文本**；蓝图 JSON / `.uasset` / 图片不生效。
- 模板与脚本从 Trilium 笔记同步而来，与 `F:\code\blueprintue-self-hosted-edition\www\bue-render` 的渲染引擎保持独立。
