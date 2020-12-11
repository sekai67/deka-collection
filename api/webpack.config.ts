import path from "path";
import { Configuration } from "webpack";

const config: Configuration = {
	mode: "production",
	entry: "./worker-src/index.ts",
	output: {
		path: path.resolve(__dirname, "./worker"),
		filename: "worker.js",
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
			},
		],
	},
};
export default config;
