import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // 假设你使用 Vue
import path from 'path' // 添加 path 模块

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
<<<<<<< HEAD
=======
  base: './', // <--- 添加这一行
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 添加 @ 别名指向 src 目录
    }
  },
>>>>>>> 90a77d083112ea7c8141bc42e51f40ae9cb776f8
  build: {
    // 其他 build 配置...
  },
  server: {
    host: true, // 或者 host: '0.0.0.0'
  },
})