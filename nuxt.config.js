
const dynamicRoutes = () => {
  return new Promise(resolve => {
    const data = this.$axios.get('http://193.168.48.193:8081/v1/items?offset=0&limit=50');
    resolve(data.items.map(el => `product/${el.id}`))
  })
}

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',
  // server: {
  //   host: '192.168.0.105' // default: localhost
  // },
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
    '@/plugins/persistedState.client.js',
    '@/plugins/filters.js',
    {
      src: '@/plugins/vue-awesome-swiper',
      mode: 'client'
    },
    // '@/plugins/axios.js'
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
    '@nuxtjs/firebase',
    '@storefront-ui/nuxt',
    '@nuxtjs/proxy',
  ],

  fontawesome: {
    icons: {
      solid: true,
      regular: true,
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
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
      auth: true // Just as example. Can be any other service.
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  generate: {
    fallback: true,
    routes: dynamicRoutes,
  }
}
