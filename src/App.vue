<template>
  <el-container class="app-outer-container">
    <!-- 侧边栏导航 -->
    <el-aside class="left" :width="layoutState.isSidebarCollapsed ? '80px' : '250px'">
      <div class="sidebar-container" :class="{ 'collapsed': layoutState.isSidebarCollapsed }">
        <SidebarNav :categories="appState.sidebarCategoriesData" :bottom-links="appState.sidebarBottomLinksData"
          :initial-category="appState.currentSidebarCategory" :is-collapsed="layoutState.isSidebarCollapsed"
          @categorySelected="navHandler.updateSidebarCategory" @sidebarSearch="navHandler.updateSidebarSearch"
          @bottomLinkClicked="navHandler.handleBottomLinkClick" @sidebarCollapse="navHandler.handleSidebarCollapse"
          @syncRouteWithCategory="navHandler.syncRouteWithCategory" />
      </div>
    </el-aside>

    <!-- 主内容区 -->
    <el-main class="right">
      <!-- 路由内容 -->
      <router-view :all-tools-data="appState.allToolsData" :selected-sidebar-category="appState.currentSidebarCategory"
        :sidebar-search-query="appState.currentSidebarSearch" :content-tabs="appState.contentTabsData"
        v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>
  </el-container>
</template>

<script setup>
import { reactive, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Menu } from '@element-plus/icons-vue';
import SidebarNav from './components/layout/SidebarNav.vue';
import {
  allTools,
  sidebarCategories,
  sidebarBottomLinks,
  contentTabs
} from './data/index.js';

// 导入拆分出的组合式函数
import { useLayoutManager } from './composables/useLayoutManager';
import { useNavigationHandler } from './composables/useNavigationHandler';
import { useRouteStateSync } from './composables/useRouteStateSync';

// 初始化状态
const appState = reactive({
  allToolsData: allTools,
  sidebarCategoriesData: sidebarCategories,
  sidebarBottomLinksData: sidebarBottomLinks,
  contentTabsData: contentTabs,
  currentSidebarCategory: 'all',
  currentSidebarSearch: '',
});

// 使用组合式函数
const router = useRouter();
const layoutState = useLayoutManager();
const { navHandler, restoreStateFromRoute } = useNavigationHandler(appState, layoutState, router);
const routeSync = useRouteStateSync(appState, router);

// 计算属性 - 是否为移动端
const isMobile = computed(() => layoutState.viewportWidth <= 768);

// 生命周期钩子
onMounted(() => {
  // 恢复应用状态
  restoreStateFromRoute();
  // 监听路由变化
  routeSync.setupRouteListener();
});

onUnmounted(() => {
  // 清理路由监听
  routeSync.removeRouteListener();
});
</script>

<style lang="less" scoped>
.app-outer-container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.left {
  height: 100%;
  min-width: fit-content;
  /* 确保侧边栏能够适应其内容 */
  flex-shrink: 0;
  /* 防止左侧区域被压缩 */
}

.right {
  flex: 1;
  /* 占据剩余所有空间 */
  height: 100%;
  overflow-y: auto;
  min-width: 0;
  /* 这是关键，确保flex子项可以小于其内容的最小宽度 */
  width: 100%;
  /* 确保占据父容器中的所有可用宽度 */
}

.sidebar-container {
  flex: 0 0 250px;
  height: 100%;
  transition: all 0.3s ease;
  background-color: #f5f7fa;

  &.collapsed {
    flex: 0 0 80px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>