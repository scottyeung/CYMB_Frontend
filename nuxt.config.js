const webpack = require('webpack')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '📷 Constantin Mirbach',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'google-site-verification', content: '' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-config', content: '/favicon/browserconfig.xml' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
      { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#fd5f00' },
      { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
      { rel: 'manifest', href: '/favicon/site.webmanifest' }
    ],
  },
  loading: false,
  plugins: [
    {src: '~/plugins/VuePackery.js', ssr: false },
    {src: '~/plugins/VueSwiper.js', ssr: false }
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    proxy: true
  },
  css: [
    '~/assets/sass/global.sass',
    'swiper/dist/css/swiper.css'
  ],
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:8080'
  },
  build: {
    extend (config, { isDev }) {
      if (isDev && process.client) {
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
        // '_orderBy': ['lodash', 'orderBy'],
        // '_find': ['lodash', 'find'],
        // '_sample': ['lodash', 'sample'],
        // '_reverse': ['lodash', 'flip'],
        '_': 'lodash'
      })
    ]
  }
}

