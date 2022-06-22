const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: path.join(__dirname, './src/index.js'),
	output: {
		path: path.join(__dirname, './dist')
	},
	resolve:{
		alias: {
			react: path.resolve(__dirname, 'node_modules/react'),
			mqtt: path.resolve(__dirname, 'node_modules/mqtt'),
			buffer: path.resolve(__dirname, 'node_modules/buffer'),
			process: path.resolve(__dirname, 'node_modules/process')
		},
		fallback: {
			"buffer": require.resolve("buffer/"),
			"process": require.resolve("process/browser.js")
		}
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
			{
				test: /\.s[ac]ss$/i,
				use: ["style-loader","css-loader","sass-loader"]
			},
			{
				test: /\.(png|jp(e*)g|svg|gif)$/,
				use: ['file-loader'],
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			},
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './public/index.html',
			favicon: './public/favicon.ico'
		}),
		new webpack.DefinePlugin({
			MIO_authlocation: "'pest'",
			MIO_mqqtlocation: "'testmqtt'"
		}),
		new webpack.ProvidePlugin({
			Buffer: ['buffer', 'Buffer']
		}),
		new webpack.ProvidePlugin({
            process: 'process/browser.js',
        }),
	]
};

