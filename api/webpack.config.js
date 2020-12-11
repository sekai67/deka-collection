const path = require("path");

/**
 * @type {import("webpack").Configuration}
 */
module.exports = {
	mode: "production",
	output: {
		filename: "worker.js",
		path: path.join(__dirname, "dist"),
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "ts-loader",
				options: {
					transpileOnly: true,
				},
			},
		],
	},
};
