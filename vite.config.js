import { fileURLToPath, URL } from 'node:url';
import { defineStore } from 'pinia';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs';

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  // server: {
  //   host: '0.0.0.0',
  //   port: 2053,
  //   https: {
  //     key: fs.readFileSync('/var/www/via-papara/v0.1/core/ssl/hub-works.online/privkey.pem'),
  //     cert: fs.readFileSync('/var/www/via-papara/v0.1/core/ssl/hub-works.online/cert.pem'),
  //     ca: fs.readFileSync('/var/www/via-papara/v0.1/core/ssl/hub-works.online/origin_ca.pem'),
  //   },
  //   strictPort: true,
  //   hmr: {
  //     host: 'hub-works.online',
  //     port: 2053,
  //     protocol: 'wss',
  //   },
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  cacheDir: '/home/broot/.vite-cache', // broot’un yazma izni olan dizin
});