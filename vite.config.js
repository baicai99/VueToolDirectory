import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // 假设你使用 Vue

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // 其他 build 配置...
  },
  server: {
    host: true, // 或者 host: '0.0.0.0'
  },
})