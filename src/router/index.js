// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'; // 我们将创建一个 HomeView 来显示主列表
import ToolDetail from '../views/ToolDetail.vue'; // 这是新的详情页组件

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView // 主页路由，显示收藏列表
  },
  {
    // :id 是一个动态参数，会匹配工具的 ID
    path: '/tool/:id',
    name: 'ToolDetail',
    component: ToolDetail,
    props: true // 将路由参数 (:id) 作为 props 传递给 ToolDetail 组件
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 使用 History 模式
  routes
});

export default router;