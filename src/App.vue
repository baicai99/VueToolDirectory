// src/App.vue
<template>
  <el-container class="app-container">
    <SidebarNav
      :categories="sidebarCategoriesData"
      :bottom-links="sidebarBottomLinksData"
      :initial-category="currentSidebarCategory"
      @categorySelected="updateSidebarCategory"
      @sidebarSearch="updateSidebarSearch"
    />

    <router-view
      :all-tools-data="allToolsData"
      :selected-sidebar-category="currentSidebarCategory"
      :sidebar-search-query="currentSidebarSearch"
      :quick-links="quickSearchLinksData"
      :content-tabs="contentTabsData"
      v-slot="{ Component }"
    >
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

  </el-container>
</template>

<script setup>
import { ref } from 'vue';
// 导入侧边栏组件和数据
import SidebarNav from './components/SidebarNav.vue';
import {
    allTools,
    sidebarCategories,
    sidebarBottomLinks,
    contentTabs // 确保 contentTabs 也被导入
} from './data/tools.js';

// --- 状态管理 ---
const allToolsData = ref(allTools);
const sidebarCategoriesData = ref(sidebarCategories);
const sidebarBottomLinksData = ref(sidebarBottomLinks);
const contentTabsData = ref(contentTabs);

const currentSidebarCategory = ref('all');
const currentSidebarSearch = ref('');

// 注意：如果在切换分类/搜索时需要强制返回列表页，需要引入并使用 router
// import { useRouter } from 'vue-router';
// const router = useRouter();

const updateSidebarCategory = (categoryId) => {
  currentSidebarCategory.value = categoryId;
  currentSidebarSearch.value = '';
  // router.push('/'); // 取消注释以在选择分类后导航到主页
};

const updateSidebarSearch = (query) => {
    currentSidebarSearch.value = query;
    // router.push('/'); // 取消注释以在搜索时导航到主页 (可选)
};

</script>

<style lang="less">
body {
  margin: 0;
  /* 使用一个常见且兼容性较好的字体栈 */
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app, .app-container, .el-container {
  height: 100vh; /* 添加分号 */
}
</style>

<style lang="less" scoped>
.app-container {
  display: flex;
  overflow: hidden;
}

/* 路由过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>