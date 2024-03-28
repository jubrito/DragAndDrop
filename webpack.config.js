const path = require('path');

module.exports = {
    mode: 'development', // fewer optimizations, make debugging easier and more meaningful error messages
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // requires an absolute path
        publicPath: '/dist/'
    },
    devtool: 'inline-source-map', // there will be generated sourcemaps already which we should extract and wire up correctly to the bundle it generates 
    module: { // how to work with files and imports
        rules: [
            {
                test: /\.ts$/,  // test on every file to see if the rules applies or not
                use: 'ts-loader', // any typescript file should be handled by ts-loader
                exclude: /node_modules/
            }
        ]
    },
    resolve: { // which file extensions it adds to the imports it finds
        extensions: ['.ts', '.js'] // bundle together all files we are importing that have these extensions 
    },
    devServer: {
        static: [
            {
                directory: path.join(__dirname),
            },
        ],
    },
}