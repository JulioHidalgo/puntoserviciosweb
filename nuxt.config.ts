import { resolve } from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2026-03-18',
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    public: {
      adminEmails: process.env.NUXT_PUBLIC_ADMIN_EMAILS || ''
    }
  },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'swiper/css',
    resolve(__dirname, 'assets/css/styles.css') 
  ],
  pages: true
})