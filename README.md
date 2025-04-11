# AI 工具收藏夹 (AI Tools Favorites)

这是一个使用 Vue 3、Vite 和 Element Plus 构建的现代化 Web 应用，旨在帮助用户整理、浏览和发现各种 AI 工具及其他在线资源。它具有清晰的布局、强大的筛选功能和独立的工具详情页面。

![](./DOC/images/image.png)

## ✨ 主要功能

* **响应式布局**: 采用左侧固定导航栏 + 右侧内容区的经典布局。
* **侧边栏导航**:
    * 包含清晰的工具分类（如 AI 工具集、文本工具、图片工具等），支持图标+文字展示。
    * 内置侧边栏搜索框，快速定位分类下的工具。
    * 底部包含额外链接入口（如 AI 快讯、交流群等）。
    * 顶部标题可通过配置文件修改。
* **内容展示区**:
    * 顶部包含主搜索框，用于在当前筛选结果中进一步搜索。
    * 提供常用搜索引擎的快捷按钮（Bing, Google 等）。
    * 支持按标签（常用、社区、图片等）进行内容筛选的 Tabs 标签页。
    * 醒目的横幅推荐区域，展示特色工具。
    * 工具以卡片网格形式展示，包含图标、名称和**简短描述**。
    * 独立的“热门工具”板块。
* **工具详情页**:
    * 点击工具卡片可导航至独立的详情页面。
    * 详情页展示更大的工具图标、名称、标签云、官网链接和**详细描述**。
    * 包含“返回”按钮，方便回退到列表。
* **数据驱动**: 工具列表、分类、标签等数据集中在 `src/data/tools.js` 中管理，易于扩展。
* **动态图标加载**: 即使数据源中的图标路径是相对于 `src` 的字符串，也能通过 `import.meta.glob` 动态解析并正确显示。
* **可配置**: 应用的浏览器标题和侧边栏名称可通过根目录下的 `.env` 文件进行配置。
* **样式**: 使用 Less 作为 CSS 预处理器，并将样式封装在各自的 Vue 组件中（Scoped Scss）。

## 🚀 技术栈

* **框架**: Vue 3 (使用 Composition API 和 `<script setup>`)
* **构建工具**: Vite
* **UI 库**: Element Plus
* **路由**: Vue Router 4
* **CSS 预处理器**: Less
* **图标**: Element Plus Icons / 本地图标文件

## 📁 项目结构

.
├── public/                  # 静态资源 (可选，如果图标放这里)
├── src/
│   ├── assets/              # 静态资源 (如图片、图标)
│   │   └── icons/           # 存放工具图标文件 (import.meta.glob 读取)
│   ├── components/          # 可复用 Vue 组件
│   │   ├── SidebarNav.vue   # 左侧导航栏
│   │   ├── ContentArea.vue  # 右侧内容区 (列表页核心)
│   │   └── ToolCard.vue     # 工具卡片
│   ├── data/                # 模拟数据
│   │   └── tools.js         # 工具列表、分类、标签等数据
│   ├── router/              # 路由配置
│   │   └── index.js
│   ├── views/               # 页面级视图组件
│   │   ├── HomeView.vue     # 主页视图 (包含 ContentArea)
│   │   └── ToolDetail.vue   # 工具详情页视图
│   ├── App.vue              # 根组件 (应用布局)
│   └── main.js              # 应用入口文件
├── .env                     # 环境变量配置文件 (需自行创建)
├── index.html               # HTML 入口
├── package.json             # 项目依赖与脚本
├── vite.config.js           # Vite 配置文件
└── README.md                # 项目说明文档


## 🛠️ 安装与运行

1.  **克隆项目** (如果是在 Git 仓库中)
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **安装依赖**
    ```bash
    npm install
    # 或者
    yarn install
    # 或者
    pnpm install
    ```

3.  **安装 Less 预处理器** (如果尚未安装)
    ```bash
    npm install -D less
    # 或者
    yarn add -D less
    # 或者
    pnpm add -D less
    ```

4.  **配置环境变量** (如果需要修改标题)
    * 在项目根目录创建 `.env` 文件。
    * 内容示例见下一节“配置”。

5.  **运行开发服务器**
    ```bash
    npm run dev
    ```
    应用将在本地启动 (通常是 `http://localhost:5173` 或类似地址)。

6.  **构建生产版本**
    ```bash
    npm run build
    ```
    构建后的文件将输出到 `dist` 目录。

## ⚙️ 配置

### 环境变量 (`.env`)

在项目根目录创建 `.env` 文件来配置应用标题和名称：

```dotenv
# .env

# 用于浏览器标签页标题
VITE_APP_TITLE="AI 工具导航 | 发现你的生产力伙伴"

# 用于侧边栏顶部显示的名称
VITE_APP_NAME="智搜导航"