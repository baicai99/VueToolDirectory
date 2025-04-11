// src/main.js
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 假设你配置了中文

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, { locale: zhCn });
app.use(router);
app.mount('#app');

// --- 在应用挂载后设置页面标题 ---
// 使用 import.meta.env 访问 .env 文件中 VITE_ 开头的变量
const appTitle = import.meta.env.VITE_APP_TITLE || '我的收藏夹'; // 提供一个备用标题
document.title = appTitle;
// --- 添加结束 ---