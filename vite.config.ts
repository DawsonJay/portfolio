import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'named',
      },
      include: '**/*.svg',
    }),
  ],
  preview: {
    host: true,
    allowedHosts: [
      'portfolio-production-d427.up.railway.app',
      '.up.railway.app', // Allow all Railway subdomains
    ],
  },
})
