import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      VITE_API_URL: process.env.VITE_API_URL,  // Expondo a variável de ambiente da API
      VITE_FRONTEND_URL: process.env.VITE_FRONTEND_URL,  // Expondo a URL do Frontend
    },
  },
})
