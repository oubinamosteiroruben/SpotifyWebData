// filepath: /c:/Users/oubin/Documents/Proyectos/Repositorios/SpotifyWeb/webpack.config.js
const path = require('path');

module.exports = {
    resolve: {
        fallback: {
            "zlib": require.resolve("browserify-zlib"),
            "querystring": require.resolve("querystring-es3"),
            "path": require.resolve("path-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "fs": false,
            "stream": require.resolve("stream-browserify"),
            "http": require.resolve("stream-http"),
            "net": false,
            "url": require.resolve("url/"),
            "buffer": require.resolve("buffer/"),
            "util": require.resolve("util/")
        }
    },
    // Otras configuraciones de Webpack
};