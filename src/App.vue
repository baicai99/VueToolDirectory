<template>
  <el-container class="app-container">
    <SidebarNav
      :categories="sidebarCategoriesData"
      :bottom-links="sidebarBottomLinksData"
      :initial-category="currentSidebarCategory"
      @categorySelected="updateSidebarCategory"
      @sidebarSearch="updateSidebarSearch"
    />

    <ContentArea
      :all-tools-data="allToolsData"
      :selected-sidebar-category="currentSidebarCategory"
      :sidebar-search-query="currentSidebarSearch"
      :quick-links="quickSearchLinksData"
      :content-tabs="contentTabsData"
    />
  </el-container>
</template>

<script setup>
import { ref } from 'vue';
import SidebarNav from './components/SidebarNav.vue';
import ContentArea from './components/ContentArea.vue';
// 从数据文件中导入数据
import {
    allTools,
    sidebarCategories,
    sidebarBottomLinks,
    quickSearchLinks,
    contentTabs
} from './data/tools.js';

// --- 响应式状态 ---
// 将导入的数据赋给响应式引用或直接使用
const allToolsData = ref(allTools);
const sidebarCategoriesData = ref(sidebarCategories);
const sidebarBottomLinksData = ref(sidebarBottomLinks);
const quickSearchLinksData = ref(quickSearchLinks);
const contentTabsData = ref(contentTabs);

// 当前侧边栏选中的分类 ID ('all', 'AI Tools', etc.)
const currentSidebarCategory = ref('all');
// 当前侧边栏搜索框的查询词
const currentSidebarSearch = ref('');

// --- 方法 ---
// 更新侧边栏选中的分类
const updateSidebarCategory = (categoryId) => {
  currentSidebarCategory.value = categoryId;
  currentSidebarSearch.value = ''; // 清空侧边栏搜索，因为分类已改变
};

// 更新侧边栏搜索查询
const updateSidebarSearch = (query) => {
    currentSidebarSearch.value = query;
    // 当在侧边栏搜索时，我们可能希望内容区自动切换到“所有工具”的视角
    // 但也可以让 ContentArea 内部处理，这里暂时不强制改变 currentSidebarCategory
    // 如果需要强制改变分类为 'all'，取消下面的注释
    // currentSidebarCategory.value = 'all';
};

</script>

<style lang="less">

/* App.vue 的全局样式或布局已移至 main.css */
.app-container {
  height: 100vh;
  overflow: hidden; /* 防止外层容器出现滚动条 */
}
// 注意：这个 style 块没有 scoped! 会影响全局
// 如果不需要全局重置，可以省略这个块
body {
  margin: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// #app 和 el-container 的高度，确保布局撑满
#app, .app-container, .el-container {
  height: 100vh;
}

// 可以在这里添加其他全局基础样式，例如链接默认样式等
</style>

<style lang="less" scoped>
/* App.vue 组件自身的布局样式 */
.app-container {
  display: flex; // 虽然el-container默认可能就是flex，明确一下无妨
  overflow: hidden; /* 防止外层容器出现滚动条 */
}

/*
  之前 main.css 中的 .fixed-aside 和 .main-content-area 的样式
  现在分别移动到 SidebarNav.vue 和 ContentArea.vue 中，
  因为它们是直接应用在这些组件根元素上的样式。
*/
</style>