// src/App.vue
<template>
  <el-container class="app-container" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
    <!-- 侧边栏导航组件 -->
    <el-aside class="sidebar-container" width="240px">
      <SidebarNav :categories="sidebarCategoriesData" :bottom-links="sidebarBottomLinksData"
        :initial-category="currentSidebarCategory" :is-collapsed="isSidebarCollapsed"
        @categorySelected="updateSidebarCategory" @sidebarSearch="updateSidebarSearch"
        @bottomLinkClicked="handleBottomLinkClick" @sidebarCollapse="handleSidebarCollapse" />
    </el-aside>

    <!-- 点击背景关闭侧边栏的遮罩层 -->
    <div class="mobile-overlay" v-if="!isSidebarCollapsed" @click="handleSidebarCollapse(true)"></div>

    <div class="main-content-container">
      <!-- 移动端顶部导航栏 -->
      <div class="mobile-header">
        <el-button class="menu-toggle" :icon="Menu" @click="handleSidebarCollapse(false)" />
        <h3 class="mobile-title">智搜导航</h3>
      </div>

      <!-- 路由内容区域 -->
      <router-view :all-tools-data="allToolsData" :selected-sidebar-category="currentSidebarCategory"
        :sidebar-search-query="currentSidebarSearch" :content-tabs="contentTabsData" v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </el-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { Menu } from '@element-plus/icons-vue';

// 导入侧边栏组件和数据
import SidebarNav from './components/layout/SidebarNav.vue';
import {
  allTools,
  sidebarCategories,
  sidebarBottomLinks,
  contentTabs
} from './data/tools.js';

// --- 获取 router 实例 ---
const router = useRouter();

// --- 移动端相关状态 ---
const isMobile = ref(window.innerWidth <= 768);
const isSidebarCollapsed = ref(window.innerWidth <= 768);

// 处理窗口大小变化
const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;

  // 在移动端自动折叠侧边栏
  if (isMobile.value && !isSidebarCollapsed.value) {
    isSidebarCollapsed.value = true;
  }
};

// 处理侧边栏折叠状态变化
const handleSidebarCollapse = (collapsed) => {
  isSidebarCollapsed.value = collapsed;
};

// 监听窗口大小变化
onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize(); // 初始检查
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// --- 状态管理 ---
const allToolsData = ref(allTools);
const sidebarCategoriesData = ref(sidebarCategories);
const sidebarBottomLinksData = ref(sidebarBottomLinks);
const contentTabsData = ref(contentTabs);

// currentSidebarCategory 用于追踪侧边栏的选中状态，以便高亮显示
const currentSidebarCategory = ref('all');
const currentSidebarSearch = ref('');

// 此方法现在只处理主分类菜单的点击事件
const updateSidebarCategory = (categoryId) => {
  currentSidebarCategory.value = categoryId; // 更新侧边栏高亮状态
  currentSidebarSearch.value = ''; // 清空侧边栏搜索

  // 直接导航到主页
  router.push('/');
};

const updateSidebarSearch = (query) => {
  currentSidebarSearch.value = query;
  // 搜索时，通常也跳转回主页以显示过滤结果
  router.push('/');
};

const handleBottomLinkClick = (link) => {
  console.log('Bottom link clicked:', link);

  // 在移动设备上自动折叠侧边栏
  if (isMobile.value) {
    isSidebarCollapsed.value = true;
  }

  // 如果有路由信息，进行路由跳转
  if (link.route) {
    router.push(link.route);
  }
  // 如果有外部链接，在新窗口打开
  else if (link.externalUrl) {
    window.open(link.externalUrl, '_blank');
  }
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

#app,
.app-container,
.el-container {
  height: 100vh;
}

@media (max-width: 768px) {
  body {
    /* 防止移动端下拉刷新 */
    overflow-y: hidden;
    overscroll-behavior-y: none;
  }
}
</style>

<style lang="less" scoped>
.app-container {
  display: flex;
  overflow: hidden;
  position: relative;

  .sidebar-container {
    transition: transform 0.3s ease;
    z-index: 1000;

    @media (max-width: 768px) {
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: 240px !important;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  }

  &.sidebar-collapsed {
    .sidebar-container {
      @media (max-width: 768px) {
        transform: translateX(-100%);
      }
    }

    .mobile-overlay {
      display: none;
    }
  }

  .mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
    z-index: 999;
    display: block;

    @media (min-width: 769px) {
      display: none;
    }
  }

  .main-content-container {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    transition: all 0.3s;

    .mobile-header {
      display: none;
      padding: 10px 15px;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      align-items: center;

      @media (max-width: 768px) {
        display: flex;
      }

      .menu-toggle {
        margin-right: 15px;
      }

      .mobile-title {
        margin: 0;
        font-size: 1.2em;
      }
    }
  }
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