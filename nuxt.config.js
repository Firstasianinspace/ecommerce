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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss',
    'swiper/swiper.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/global.js',
    '@/plugins/vuelidate.js',
    // {
    //   src: '@/plugins/persistedState.client.js',
    //   mode: 'client'
    // },
    '@/plugins/filters.js',
    {
      src: '@/plugins/vue-awesome-swiper',
      mode: 'client'
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/fontawesome'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/firebase',
    '@nuxtjs/auth-next'
    // '@nuxtjs/proxy',
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
    // baseURL: 'http://193.168.48.193:8081/v1',
    proxy: true,
    //   proxyHeadersIgnore: ['accept', 'host', 'x-forwarded-host', 'x-forwarded-port', 'x-forwarded-proto', 'cf-ray', 'cf-connecting-ip', 'content-length', 'content-md5', 'content-type'],
    // },
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
      // local: {
      //   token: {
      //     // property: 'token',
      //     global: true,
      //     // required: true,
      //     // type: 'Bearer'
      //   },
      //   user: false,
      //   endpoints: {
      //     login: { url: '/api/auth', method: 'post' },
      //     // logout: { url: '/api/auth/logout', method: 'post' },
      //     // user: { url: '/api/auth/user', method: 'get' }
      //   }
      // },
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
      /* ... */
    }
  },
  // proxy: {
  //   '/api/': {
  //     target: 'http://193.168.48.193:8081/v1',
  //     pathRewrite: {
  //       '^/api': '/'
  //     },
  //   }
  // },
  firebase: {
    config: {
      apiKey: 'AIzaSyDgvdQ8otbAiXAfzUzWTOAZD3FrfeAzejA',
      authDomain: 'itcoursetest-aa7ea.firebaseapp.com',
      projectId: 'itcoursetest-aa7ea',
      storageBucket: 'itcoursetest-aa7ea.appspot.com',
      messagingSenderId: '787333155264',
      appId: '1:787333155264:web:23c026c4f601484a402025',
      measurementId: 'G-1C30EJFRKJ'
    },
    services: {
      auth: true,
      firestore: true,
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  generate: {
    fallback: true,
  }
}
