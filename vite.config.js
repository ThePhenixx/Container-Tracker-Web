import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rewriteAll from 'vite-plugin-rewrite-all';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),  rewriteAll()],
  server: {
    port: 5173,
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      // include: [/linked-dep/, /node_modules/],
    },
  },
})








