import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
const API_URL = 'http://localhost:3000'
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    open: true, 
    proxy: { // 为开发服务器配置自定义代理规则
        '/api/v1': {
          target: API_URL
        }
    }
  }
})
