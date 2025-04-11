// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ToolDetail from '../views/ToolDetail.vue';
import RankingView from '../views/RankingView.vue';
// --- 导入新的视图组件 ---
import NewsView from '../views/NewsView.vue';
import HotToolsView from '../views/HotToolsView.vue'; // 假设你也创建了 HotToolsView.vue

// --- 移除内联定义 ---
// const NewsView = { template: ... };
// const HotToolsView = { template: ... };

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/tool/:id', name: 'ToolDetail', component: ToolDetail, props: true },
  { path: '/ranking', name: 'Ranking', component: RankingView },
  {
    path: '/news',
    name: 'News',
    component: NewsView // --- 使用导入的组件 ---
  },
  {
    path: '/hot-tools',
    name: 'HotTools',
    component: HotToolsView // --- 使用导入的组件 ---
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;