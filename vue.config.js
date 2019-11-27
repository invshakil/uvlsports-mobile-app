module.exports = {
    publicPath: '',

    pages: {
        index: {
            // entry for the page
            entry: 'src/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'index.html',
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'UVL Sports App',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
    },

    css: {
        // modules: true,
        // loaderOptions: {
        //     scss: {
        //         // data: `@import "./src/styles/_variables.scss";`
        //     },
        // }
    },

    chainWebpack: config => {
        config.optimization.delete('splitChunks')
    },

    pluginOptions: {
      cordovaPath: 'cordova'
    }
}
