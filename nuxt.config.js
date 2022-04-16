export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',
  server: {
    host: '192.168.0.105' // default: localhost
  },
  head: {
    title: 'ecommerce',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      },
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
  },
  css: [
    '@/assets/scss/_variables.scss',
    '@/assets/scss/main.scss',
    'swiper/swiper.scss',
  ],
  plugins: [
    '@/plugins/global.js',
    '@/plugins/vuelidate.js',
    '@/plugins/filters.js',
    '@/plugins/v-mask.js',
    {
      src: '@/plugins/vue-awesome-swiper',
      mode: 'client'
    },
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/fontawesome',
    '@nuxtjs/dotenv'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth-next',
    '@nuxtjs/cloudinary'
  ],

  fontawesome: {
    icons: {
      solid: true,
      regular: true,
    }
  },
  router: {
    middleware: ['auth']
  },
  axios: {
    proxy: true,
  },
  proxy: {
    '/api/': {
      target: 'http://193.168.48.193:8081/v1',
      pathRewrite: {
        '^/api': '/'
      },
    }
  },
  auth: {
    strategies: {
      customStrategy: {
        scheme: '~/schemes/userScheme',
        token: {
          maxAge: 900,
          global: true,
          type: '',
        },
        endpoints: {
          login: {
            url: '/api/auth',
            method: 'post'
          },
          user: false,
        }
      }
    }
  },
  cloudinary: {
    cloudName: 'firstasianinspace',
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
  },
  build: {},
  generate: {
    fallback: true,
  }
}
