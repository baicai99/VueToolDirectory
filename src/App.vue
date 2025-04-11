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
import { useRouter } from 'vue-router'; // <--- 1. 导入 useRouter

// 导入侧边栏组件和数据
import SidebarNav from './components/SidebarNav.vue';
import {
    allTools,
    sidebarCategories,
    sidebarBottomLinks,
    // quickSearchLinks, // 确认已移除
    contentTabs
} from './data/tools.js';

// --- 获取 router 实例 ---
const router = useRouter(); // <--- 2. 获取 router 实例

// --- 状态管理 ---
const allToolsData = ref(allTools);
const sidebarCategoriesData = ref(sidebarCategories);
const sidebarBottomLinksData = ref(sidebarBottomLinks);
// const quickSearchLinksData = ref(quickSearchLinks); // 确认已移除
const contentTabsData = ref(contentTabs);

const currentSidebarCategory = ref('all');
const currentSidebarSearch = ref('');

// --- 修改这个方法 ---
const updateSidebarCategory = (categoryId) => {
  console.log('Category selected in App:', categoryId); // 可以加个 log 确认
  currentSidebarCategory.value = categoryId; // 更新分类状态
  currentSidebarSearch.value = ''; // 清空侧边栏搜索

  // --- 添加路由跳转 ---
  // 无论当前在哪，点击分类都跳转回主列表页 '/'
  router.push('/'); // <--- 3. 添加这行代码
  // --- 添加结束 ---
};

const updateSidebarSearch = (query) => {
    currentSidebarSearch.value = query;
    // 如果希望在侧边栏搜索时也跳转回主页，也可以在这里加 router.push('/')
    // router.push('/');
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