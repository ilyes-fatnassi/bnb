import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',    // Listen on all IPv4 interfaces
    port: 5174,         // Use the same port
    strictPort: true,   // Don't try other ports if 5174 is taken
    hmr: {
      host: '0.0.0.0',  // Enable HMR on all interfaces
      port: 5174
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 5174
  }
})