const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // Custom theme configuration, if needed
      theme: {
        dark: true, // Change to true if you want to enable dark mode
      },
    },
  }
})
