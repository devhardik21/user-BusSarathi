import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // automatically check for updates
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'DriverSarathi',
        short_name: 'Driver',
        description: 'My awesome PWA built with React + Vite',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          { src: '/user192.jpg', sizes: '192x192', type: 'image/jpg' },
          { src: '/user512.png', sizes: '512x512', type: 'image/png' },
        ]
      }
    })
  ]
})
