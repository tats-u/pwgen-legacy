import colors from "vuetify/es5/util/colors"
import HardSourceWebpackPlugin from "hard-source-webpack-plugin"

const ghpagesRoot = "/pwgen"

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: `${
          process.env.DEPLOY_ENV === "GH_PAGES" ? ghpagesRoot : ""
        }/favicon.ico`
      }
      // { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxt/typescript-build",
    "@nuxtjs/eslint-module",
    "@nuxtjs/vuetify"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ["nuxt-clipboard2", "nuxt-i18n"],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    defaultAssets: {
      font: true,
      icons: "mdi"
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.cyan.darken1,
          secondary: colors.indigo.darken4,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
    vueI18n: {
      fallbackLocale: "en"
    }
  },
  typescript: {
    typeCheck: process.env.NODE_ENV !== "production",
    ignoreNotFoundWarnings: true
  },
  /*
   ** Build configuration
   */
  build: {
    cache: true,
    parallel: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module.rules.push({
        resourceQuery: /blockType=i18n/,
        type: "javascript/auto",
        loader: ["@kazupon/vue-i18n-loader", "yaml-loader"]
      })
      config.plugins.push(new HardSourceWebpackPlugin())
    }
  },
  ...(process.env.DEPLOY_ENV === "GH_PAGES"
    ? {
        router: {
          base: ghpagesRoot
        }
      }
    : {})
}
