import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // 假设你使用 Vue

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', // <--- 添加这一行
  build: {
    // 其他 build 配置...
  }
})