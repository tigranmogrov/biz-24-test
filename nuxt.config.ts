import { resolve } from 'node:path';

export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['acceptHMRUpdate', 'defineStore', ['defineStore']],
      },
    ],
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],
  nitro: {
    plugins: ['../server/db/index.ts'],
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    mongodbName: process.env.DATABASE_NAME,
    userName: process.env.DATABASE_USER_NAME,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
        class: 'dark',
      },
      title: 'biz23 test',
      charset: 'utf-8',
    },
  },
  srcDir: './client',
  serverDir: './server',
  imports: {
    dirs: ['stores', '~stores', '~node_modules', '~server', '~public'],
  },
  alias: {
    cookie: resolve(__dirname, 'node_modules/cookie'),
  },
});
