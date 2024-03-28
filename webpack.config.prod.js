const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production', // more optimizations
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // requires an absolute path
    },
    devtool: false,// won't use sourcemaps
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
    plugins: [ // applied to the general workflow, not only on files like the module rules
        new CleanPlugin.CleanWebpackPlugin() // deletes everything on the dist folder before rebuilding the project
    ]
}