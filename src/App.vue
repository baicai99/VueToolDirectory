// src/App.vue
<template>
  <div class="app-outer-container">
    <!-- 侧边栏导航组件，使用固定定位脱离文档流 -->
    <div class="sidebar-container" :class="{ 'collapsed': isSidebarCollapsed }">
      <SidebarNav :categories="sidebarCategoriesData" :bottom-links="sidebarBottomLinksData"
        :initial-category="currentSidebarCategory" :is-collapsed="isSidebarCollapsed"
        @categorySelected="updateSidebarCategory" @sidebarSearch="updateSidebarSearch"
        @bottomLinkClicked="handleBottomLinkClick" @sidebarCollapse="handleSidebarCollapse" />
    </div>

    <!-- 点击背景关闭侧边栏的遮罩层 -->
    <transition name="fade-blur">
      <div class="mobile-overlay" v-if="!isSidebarCollapsed" @click="handleSidebarCollapse(true)"></div>
    </transition>

    <!-- 主内容区，完全独立于侧边栏 -->
    <div class="main-content-container" :class="{ 'sidebar-expanded': !isSidebarCollapsed }">
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
  </div>
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

// 计算并设置真实的视口高度
const setViewportHeight = () => {
  // 将视口高度设置为CSS变量，解决移动浏览器地址栏收缩问题
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// 修改强制触发全屏滚动行为的函数
const triggerBrowserBarsHiding = () => {
  // 只在页面初始加载时执行一次，而不是每次滚动都执行
  if (!window.hasTriggeredBarsHiding) {
    window.hasTriggeredBarsHiding = true;
    // 使用更温和的方式，只滚动最小距离
    setTimeout(() => {
      if (window.scrollY === 0) {
        window.scrollTo(0, 1);
      }
    }, 300);
  }
};

// 处理窗口大小变化
const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;

  // 重新计算视口高度
  setViewportHeight();

  // 在移动端自动折叠侧边栏
  if (isMobile.value && !isSidebarCollapsed.value) {
    isSidebarCollapsed.value = true;
  }

  // 只有在页面顶部才重新触发浏览器地址栏隐藏
  if (isMobile.value && window.scrollY === 0) {
    triggerBrowserBarsHiding();
  }
};

// 监听窗口大小变化和滚动事件
onMounted(() => {
  window.addEventListener('resize', handleResize);
  // 移除滚动事件监听器，防止它影响正常滚动
  window.addEventListener('scroll', () => {
    // 只更新视口高度，不再强制滚动
    setViewportHeight();
  });

  // 初始化视口高度
  setViewportHeight();
  // 只在组件挂载后触发一次
  triggerBrowserBarsHiding();
  handleResize(); // 初始检查
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('scroll', setViewportHeight);
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

  // 在移动设备上自动折叠侧边栏
  if (isMobile.value) {
    isSidebarCollapsed.value = true;
  }

  // 直接导航到主页
  router.push('/');
};

const updateSidebarSearch = (query) => {
  currentSidebarSearch.value = query;

  // 在移动设备上自动折叠侧边栏
  if (isMobile.value) {
    isSidebarCollapsed.value = true;
  }

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

// 处理侧边栏折叠状态
const handleSidebarCollapse = (collapsed) => {
  console.log('Sidebar collapse toggled:', collapsed);
  isSidebarCollapsed.value = collapsed;
};
</script>

<style lang="less">
/* 全局根样式 */
:root {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 基础元素样式 */
body {
  margin: 0;
  /* 使用一个常见且兼容性较好的字体栈 */
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* 适应移动浏览器的安全区域 */
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);

  /* 全局滚动行为控制 - 修改这些设置允许滚动 */
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: auto;
  /* 允许普通的滚动反弹行为 */

  /* 修改触摸行为，允许滚动但禁用缩放 */
  touch-action: pan-x pan-y;
  /* 允许平移 */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: static;
}

/* 移动设备优化 */
@media (max-width: 768px) {
  body {
    /* 使用视口单位确保全屏内容 */
    min-height: -webkit-fill-available;
    /* 允许页面滚动 */
    overflow-y: auto !important;
    /* 强制允许滚动 */
    -webkit-overflow-scrolling: touch;
    /* 确保滚动流畅 */
    overscroll-behavior-y: auto;
    /* 允许普通的滚动行为 */
  }
}

/* 基础元素样式 */
a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;

  &:hover {
    color: #535bf2;
  }
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    border-color: #646cff;
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
}

#app,
.app-container,
.el-container {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }

  a:hover {
    color: #747bff;
  }

  button {
    background-color: #f9f9f9;
  }
}
</style>

<style lang="less" scoped>
/* 
* 主应用容器 - 采用全新的布局结构
*/
.app-outer-container {
  display: flex;
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;

  /* 侧边栏容器 */
  .sidebar-container {
    width: 240px;
    flex-shrink: 0;
    z-index: 1000;
    background-color: #fff;
    transition: transform 0.3s ease;

    /* 桌面端侧边栏 - 使用固定定位脱离文档流 */
    @media (min-width: 769px) {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      overflow-y: hidden;
      /* 改为hidden，由内部元素自行处理滚动 */
      /* 阻止滚动事件传递 */
      overscroll-behavior: contain;
      overscroll-behavior-y: contain;
      isolation: isolate;
      /* 创建新的层叠上下文 */
      /* 添加 touch-action 限制，防止滚动事件穿透 */
      touch-action: pan-x;
    }

    /* 移动端侧边栏 */
    @media (max-width: 768px) {
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: 240px !important;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      transform: translateX(0);
      isolation: isolate;
      /* 创建新的层叠上下文 */

      &.collapsed {
        transform: translateX(-100%);
      }
    }
  }

  /* 遮罩层 */
  .mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    z-index: 999;
    display: block;

    @media (min-width: 769px) {
      display: none;
    }
  }

  /* 主内容区 */
  .main-content-container {
    flex: 1;
    width: 100%;
    min-height: 100vh;

    /* 桌面端下，为侧边栏留出空间 */
    @media (min-width: 769px) {
      margin-left: 240px;
    }

    /* 移动端顶部导航栏 */
    .mobile-header {
      display: none;
      padding: 10px 15px;
      background-color: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      align-items: center;
      padding-top: max(10px, env(safe-area-inset-top));

      @media (max-width: 768px) {
        display: flex;
        position: sticky;
        top: 0;
        z-index: 10;
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

/* 添加遮罩层的淡入淡出和模糊效果过渡 */
.fade-blur-enter-active,
.fade-blur-leave-active {
  transition: opacity 0.3s ease, backdrop-filter 0.3s ease;
  transition: opacity 0.3s ease, -webkit-backdrop-filter 0.3s ease;
}

.fade-blur-enter-from,
.fade-blur-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
}
</style>