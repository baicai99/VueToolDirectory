// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ToolDetail from '../views/ToolDetail.vue';
import RankingView from '../views/RankingView.vue';
// --- 导入新的视图组件 ---
import NewsView from '../views/NewsView.vue';
import HotToolsView from '../views/HotToolsView.vue'; // 假设你也创建了 HotToolsView.vue
import ChatWithMe from '../views/ChatWithMe.vue';
import ExternalPageView from '../views/ExternalPageView.vue'; // <--- 1. 导入新组件

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
  // --- 新增的路由配置 ---
  // 这个模版修改的是外部ifram
  {
    path: '/my-website', // 定义一个内部路径
    name: 'MyWebsite',    // 定义路由名称
    component: ExternalPageView, // 使用 ExternalPageView 组件
    props: {
      // 直接在路由配置中将 URL 作为 prop 传递
      url: 'https://www.zhengjiyuan.top'
    }
  },
  {
    path: '/chat-with-me', // 定义路径
    name: 'ChatWithMe',   // 定义路由名称 (需要与 tools.js 中的 route.name 匹配)
    component: ExternalPageView, // 复用 ExternalPageView 组件
    props: {
      // 传入 Dify Chatbot 的 URL
      url: 'https://dify.zhengjiyuan.top/chatbot/9Y25YaGwhkda2Ayl'
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;