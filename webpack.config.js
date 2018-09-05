var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var html = new HtmlWebpackPlugin({
    template : 'src/main/resources/index.template.ejs',
    inject : 'body',
});


module.exports = {
    entry : [ './src/main/js/index.jsx' ],
    output : {
        path : __dirname + '/target/dist',
        publicPath : '/',
        filename : 'bundle.js'
    },
    target: 'web',
    debug: true,
    module : {
        loaders : [
                {
                    test : /\.jsx?$/,
                    exclude : /node_modules/,
                    loader : 'babel'
                },
				{
				    test: /\.css$/,
				    loader: 'style!css'
				}
    ]},
    resolve : {
        extensions : [ '', '.js', '.jsx', '.ts'],
        root : [ path.resolve('./src/main/js'), path.resolve('./target/generated-sources/antlr4') ]
    },
    plugins : [ html ],
    devServer : {
        contentBase : './target/dist',
        host : '0.0.0.0',
        port : 8086,
        headers : {
            "Access-Control-Allow-Origin" : "*"
        },
        proxy : {
            '/' : {
                target : 'http://localhost:4010'
            }
        }
    }
};
