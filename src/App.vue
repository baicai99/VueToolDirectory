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
import { useRouter } from 'vue-router'; // 确保已导入

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
const router = useRouter(); // 获取 router 实例

// --- 状态管理 ---
const allToolsData = ref(allTools);
const sidebarCategoriesData = ref(sidebarCategories);
const sidebarBottomLinksData = ref(sidebarBottomLinks);
// const quickSearchLinksData = ref(quickSearchLinks); // 确认已移除
const contentTabsData = ref(contentTabs);

// currentSidebarCategory 用于追踪侧边栏的选中状态，以便高亮显示
const currentSidebarCategory = ref('all');
const currentSidebarSearch = ref('');

// --- 简化这个方法 ---
// 此方法现在只处理主分类菜单的点击事件
const updateSidebarCategory = (categoryId) => {
  // console.log('Main Category selected in App:', categoryId); // 用于调试
  currentSidebarCategory.value = categoryId; // 更新侧边栏高亮状态
  currentSidebarSearch.value = ''; // 清空侧边栏搜索

  // --- 直接导航到主页 ---
  // 因为 llm-ranking 的导航已由 SidebarNav 的 handleBottomLinkClick 处理
  // 所以这里不需要再做特殊判断，点击任何主分类都去主页
  router.push('/');
  // --- 简化结束 ---
};

const updateSidebarSearch = (query) => {
    currentSidebarSearch.value = query;
    // 搜索时，通常也跳转回主页以显示过滤结果
    router.push('/');
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