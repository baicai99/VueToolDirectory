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

// --- 动态计算视口高度，解决移动浏览器中Chrome搜索框和导航条的问题 ---
function setVhProperty() {
  // 获取视口实际高度
  const vh = window.innerHeight * 0.01;
  // 设置CSS变量
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// 初始计算
setVhProperty();

// 在窗口大小变化、页面滚动以及页面加载完成时重新计算
window.addEventListener('resize', setVhProperty);
window.addEventListener('scroll', setVhProperty);
window.addEventListener('orientationchange', setVhProperty);
window.addEventListener('load', setVhProperty);
// --- 添加结束 ---