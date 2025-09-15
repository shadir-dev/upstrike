import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    
  },
   server: {
    host: true,   // 👈 this makes it accessible on your Wi-Fi network
      port: 5175,   // 👈 optional, fix port instead of random
   }
})
