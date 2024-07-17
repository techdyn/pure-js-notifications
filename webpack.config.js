const path = require('path');
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
	entry: ['./src/index.js', './src/style.scss'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'notifications.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.scss$/,
				use: [
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [],
	mode: isDevelopment ? 'development' : 'production'
};
