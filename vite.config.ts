import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5174,
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@lib', replacement: path.resolve(__dirname, './src/lib') },
      { find: '@components', replacement: path.resolve(__dirname, './src/components') }
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
})
