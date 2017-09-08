var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './public/app.js',
	output: { path: __dirname, filename: 'public/bundle.js' },
	watch: true,

	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			}
		],
	},

	// plugins: [
	// 		new webpack.LoaderOptionsPlugin({
	// 			minimize: true,
	// 			debug: false
	// 		}),
	// 		new webpack.optimize.UglifyJsPlugin({
	// 				beautify: false,
	// 				mangle: {
	// 				screw_ie8: true,
	// 				keep_fnames: true
	// 			},
	// 			compress: {
	// 				screw_ie8: true
	// 			},
	// 			comments: false
	// 		})
	// 	]
};﻿
