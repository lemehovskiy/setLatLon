module.exports = {
    watch: true,
    entry: './src/setLatLon.es6',
    output: {
        filename: 'build/setLatLon.js',
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.es6$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }
};