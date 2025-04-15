<template>
  <div class="app-layout">
    <aside class="app-sidebar" :class="{ 'is-collapsed': isSidebarCollapsed }">
      <SidebarNav
        :categories="sidebarCategoriesData"
        :bottom-links="sidebarBottomLinksData"
        :initial-category="currentSidebarCategory"
        :is-collapsed="isSidebarCollapsed"
        @categorySelected="updateSidebarCategory"
        @sidebarSearch="updateSidebarSearch"
        @bottomLinkClicked="handleBottomLinkClick"
        @sidebarCollapse="handleSidebarCollapse"
      />
    </aside>

    <transition name="fade-blur">
      <div
        v-if="showMobileOverlay"
        class="mobile-overlay"
        @click="closeSidebarOnMobile"
        aria-hidden="true"
      ></div>
    </transition>

    <main class="app-main-content">
      <MobileHeader
        v-if="isMobile"
        :title="'智搜导航'"
        :is-sidebar-collapsed="isSidebarCollapsed"
        @sidebarCollapse="handleSidebarCollapse"
      />

      <div class="app-router-view-wrapper">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component
              :is="Component"
              :all-tools-data="allToolsData"
              :selected-sidebar-category="currentSidebarCategory"
              :sidebar-search-query="currentSidebarSearch"
              :content-tabs="contentTabsData"
            />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useDebounceFn } from '@vueuse/core'; // 引入防抖函数库

// 导入子组件和数据
import SidebarNav from './components/layout/SidebarNav.vue';
import MobileHeader from './components/layout/MobileHeader.vue';
import {
  allTools,
  sidebarCategories,
  sidebarBottomLinks,
  contentTabs,
} from './data/index.js';

// --- 路由 ---
const router = useRouter();

// --- 响应式状态 ---
const allToolsData = ref(allTools);
const sidebarCategoriesData = ref(sidebarCategories);
const sidebarBottomLinksData = ref(sidebarBottomLinks);
const contentTabsData = ref(contentTabs);

const currentSidebarCategory = ref('all');
const currentSidebarSearch = ref('');

// 设备与侧边栏状态
const windowWidth = ref(window.innerWidth);
const isMobile = computed(() => windowWidth.value <= 768);
// 初始状态：移动端默认折叠，PC端默认展开
const isSidebarCollapsed = ref(window.innerWidth <= 768);
// 移动端遮罩层显示逻辑
const showMobileOverlay = computed(() => isMobile.value && !isSidebarCollapsed.value);

// --- 生命周期与事件处理 ---

// 优化：防抖处理 resize
const handleResize = useDebounceFn(() => {
  windowWidth.value = window.innerWidth;
  // 在PC端，如果窗口从 <768 变为 >=768，自动展开侧边栏 (如果之前是折叠的)
  // 在移动端，如果窗口从 >=768 变为 <768，自动折叠侧边栏 (如果之前是展开的)
  // 这部分逻辑可以根据产品需求调整，目前保持简单：resize 时不强制改变折叠状态，除非是从移动切到PC或反之
  // if (isMobile.value && !isSidebarCollapsed.value) {
  //   isSidebarCollapsed.value = true; // 切换到移动端时折叠
  // } else if (!isMobile.value && isSidebarCollapsed.value) {
      // isSidebarCollapsed.value = false; // (可选) 切换到PC端时展开
  // }
}, 200); // 200ms 防抖

onMounted(() => {
  window.addEventListener('resize', handleResize);
  // 移除 setViewportHeight 和 triggerBrowserBarsHiding 相关逻辑，
  // 使用更现代的 CSS 单位或接受默认行为，简化代码。
  // 如果确实需要 --vh，可以在 handleResize 中设置，但避免 calc()
  // setInitialViewportHeight(); // 如果需要，可以保留初始设置
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// --- 方法 ---

// 更新侧边栏选中项
const updateSidebarCategory = (categoryId) => {
  currentSidebarCategory.value = categoryId;
  currentSidebarSearch.value = '';
  closeSidebarOnMobile(); // 选择后在移动端关闭侧边栏
  router.push('/'); // 导航到主页显示结果
};

// 更新侧边栏搜索
const updateSidebarSearch = (query) => {
  currentSidebarSearch.value = query;
  closeSidebarOnMobile(); // 搜索后在移动端关闭侧边栏
  router.push('/'); // 导航到主页显示结果
};

// 处理底部链接点击
const handleBottomLinkClick = (link) => {
  console.log('Bottom link clicked:', link);
  closeSidebarOnMobile(); // 点击后在移动端关闭侧边栏

  if (link.route) {
    router.push(link.route);
  } else if (link.externalUrl) {
    window.open(link.externalUrl, '_blank');
  }
};

// 切换侧边栏折叠状态 (来自 SidebarNav 或 MobileHeader 的事件)
const handleSidebarCollapse = (collapsed) => {
  // 如果是移动端，点击按钮切换状态
  // 如果是PC端，通常不允许通过按钮折叠（除非 SidebarNav 内部有此设计）
  // 这里简化为直接设置状态
  isSidebarCollapsed.value = collapsed;
  console.log('Sidebar collapse toggled:', collapsed);
};

// 在移动端关闭侧边栏 (用于遮罩层点击、菜单选择等)
const closeSidebarOnMobile = () => {
  if (isMobile.value) {
    isSidebarCollapsed.value = true;
  }
};

// 监听路由变化，确保移动端侧边栏在导航后关闭
// watch(
//   () => router.currentRoute.value.path,
//   () => {
//     closeSidebarOnMobile();
//   }
// );

/*
// --- (可选) 替代 --vh 的 JS 方案 ---
// 如果 100vh 在特定移动浏览器上问题严重，可以启用这个
const setViewportHeightProperty = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh-js', `${vh}px`);
}
onMounted(() => {
  window.addEventListener('resize', handleResize);
  window.visualViewport?.addEventListener('resize', setViewportHeightProperty); // 监听虚拟视口变化
  setViewportHeightProperty(); // Initial set
});
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  window.visualViewport?.removeEventListener('resize', setViewportHeightProperty);
});
// 然后在 CSS 中使用 height: calc(var(--vh-js, 1vh) * 100) 或者直接 height: var(--dynamic-height, 100vh)
// 但鉴于你禁止 calc()，可以直接在 JS 中计算精确像素值并设置给 #app
// const appElement = document.getElementById('app'); // or ref
// if (appElement) appElement.style.height = `${window.innerHeight}px`;
// 但这种方式通常不如纯 CSS 方案灵活。建议优先使用 100vh 或 100dvh。
*/

</script>

<style lang="less">
/* 全局和基础样式 (保留大部分，移除或简化与滚动/高度相关的复杂规则) */
:root {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* 移除 --vh 变量，除非选择 JS 方案并重新引入 */
}

html {
  height: 100%; /* 确保 html 是 100% 高度 */
}

body {
  margin: 0;
  padding: 0; /* 移除安全区域 padding，通常在特定容器内处理 */
  font-family: inherit; /* 继承 :root */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  min-height: 100%; /* 使用 min-height 替代 height */
  overflow-x: hidden; /* 防止水平滚动 */
  position: relative; /* 确保 body 是定位上下文 */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

/* 如果需要支持 iOS 刘海屏等安全区域，在需要避让的元素上设置 padding */
/* 例如 .app-main-content { padding: env(safe-area-inset-top) ... } */

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
  &:hover { color: #535bf2; }
}

h1 { /* ... */ }
button { /* ... */ }

#app {
  /* 使 app 容器占满父元素 (body) */
  height: 100vh; /* 优先使用 vh 单位，更现代且能处理地址栏问题 */
  /* 如果 100vh 问题严重, 考虑 100dvh (Dynamic Viewport Height) */
  /* height: 100dvh; */
  /* 或者 fallback 到 100% (如果html, body 设置了 height: 100%) */
  /* height: 100%; */
  /* 移除 calc(var(--vh...)) */
}

/* 颜色方案 */
@media (prefers-color-scheme: light) { /* ... */ }
</style>

<style lang="less" scoped>
.app-layout {
  display: flex;
  width: 100%;
  height: 100vh; /* 或者 100dvh / 100% */
  overflow: hidden; /* 布局容器本身不滚动 */
  background-color: #f0f2f5; /* 给布局一个背景色，可选 */
}

.app-sidebar {
  width: 240px;
  flex-shrink: 0; /* 固定宽度，不压缩 */
  height: 100%; /* 占满父容器高度 */
  background-color: #fff;
  z-index: 1000;
  transition: transform 0.3s ease, width 0.3s ease; /* 添加宽度过渡 */
  overflow-y: auto; /* 侧边栏内部内容可滚动 */
  overscroll-behavior: contain; /* 防止滚动穿透 */

  /* PC 端样式 (默认) */
  @media (min-width: 769px) {
    position: relative; /* 在 flex 布局中保持文档流 */
    transform: translateX(0);
    /* &.is-collapsed { */
      /* 如果 PC 端也需要折叠功能，在这里添加样式 */
      /* width: 64px; */ /* 例如折叠后的宽度 */
      /* overflow: hidden; */
    /* } */
  }

  /* 移动端样式 */
  @media (max-width: 768px) {
    position: fixed; /* 固定定位，脱离文档流 */
    left: 0;
    top: 0;
    transform: translateX(0);
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);

    &.is-collapsed {
      transform: translateX(-100%);
    }
  }
}

.mobile-overlay {
  position: fixed;
  inset: 0; /* 等同于 top/left/right/bottom: 0 */
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  z-index: 999; /* 低于侧边栏 */

  /* 默认只在移动端显示，由 v-if 控制 */
  /* @media (min-width: 769px) { display: none; } */ // 不需要了，v-if 处理
}

.app-main-content {
  flex-grow: 1; /* 占据剩余空间 */
  height: 100%; /* 占满父容器高度 */
  display: flex;
  flex-direction: column; /* 内部垂直布局: Header (可选) + Content */
  overflow: hidden; /* 主内容区容器不滚动 */

  /* PC 端 */
  @media (min-width: 769px) {
    // margin-left: 0; /* 因为 sidebar 是 flex item，不需要 margin */
    // 如果侧边栏在PC端折叠，这里可能需要调整
    // transition: margin-left 0.3s ease;
    // &.sidebar-collapsed { margin-left: 64px; /* 配合侧边栏折叠后的宽度 */ }
  }

  /* 移动端 */
  @media (max-width: 768px) {
    // margin-left: 0; /* 侧边栏 fixed，主内容区自动占满 */
  }
}

.app-router-view-wrapper {
  flex-grow: 1; /* 占据主内容区的剩余空间 */
  overflow-y: auto; /* !!! 路由内容区域负责滚动 !!! */
  overscroll-behavior: contain; /* 防止滚动穿透 */
  padding: 16px; /* 示例：给内容区添加内边距 */
  position: relative; /* 为内部绝对定位元素提供上下文 */
  /* 如果需要考虑移动端安全区域 */
  // padding-bottom: env(safe-area-inset-bottom);
}

/* 过渡动画 (保持不变) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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