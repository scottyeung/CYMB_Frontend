const webpack = require('webpack')
require('dotenv').config()

module.exports = {
  mode: 'universal',
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#55b23e' },
      { name: 'msapplication-config', content: '/favicon/browserconfig.xml' },
      { name: 'theme-color', content: '#55b23e' },
      { 'http-equiv': 'Cache-control', content: 'public'},
      { 'http-equiv': 'Cache-control', content: 'max-age=31536000'}
    ],
    title: 'Constantin Mirbach',
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
      { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#55b23e' },
      { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
      { rel: 'manifest', href: '/favicon/site.webmanifest' }
    ]
  },
  loading: false,
  plugins: [
    {src: '~/plugins/VuePackery.js', ssr: false }
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    ['nuxt-sass-resources-loader', './assets/sass/variables.sass']
  ],
  axios: {
    // baseURL: process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:8888/rest' : 'https://cms.constantinmirbach.com/rest',
    baseURL: 'https://cms.constantinmirbach.com/rest'
  },
  css: [
    '~/assets/sass/global.sass'
  ],
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:8080'
  },
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        '_.find': ['lodash', 'find'],
        '_.sample': ['lodash', 'sample'],
        '_.shuffle': ['lodash', 'shuffle'],
        '_.debounce': ['lodash', 'debounce'],
      })
    ]
  }
}

