module.exports = () => {
	return {
		sourceMaps: true,
		plugins: [
			["rewrite-require", {
				"aliases": {
					"brorand": "brorand-shim",
					"crypto": "crypto-browserify",
					"stream": "stream-browserify",
					"process": "process/browser.js",
					"zlib": "zlib-browserify",
					"vm": "vm-browserify"
				}
			}],
			[
				"module-resolver",
				{
					alias: {
						"randombytes": require.resolve("./randombytes.js"),
					},
				},
			],
		],
	}
};