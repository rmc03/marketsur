import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2015', // Compatibilidad con navegadores más antiguos
    cssTarget: 'chrome61', // Compatibilidad CSS
    minify: 'esbuild', // Usar esbuild en lugar de terser
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
        },
      },
    },
  },
  server: {
    host: true, // Permite acceso desde red local
  },
})
