process.env.BROWSER = "none";
process.env.GENERATE_SOURCEMAP = "false";

module.exports = {
	eslint: {
		enable: false,
	},
	plugins: [
		{
			plugin: require("craco-plugin-scoped-css"),
		},
	],
};
