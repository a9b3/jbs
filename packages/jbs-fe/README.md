## JBS FE

1. `yarn add jbs-fe --dev`
2. Add fields to package.json.

	```json
	{
		"scripts": {
			"build": "./node_modules/jbs-fe/bin.js build"
		},
		"babel": {
			"presets": ["./node_modules/jbs-fe/configs/babel-preset-jbs-fe.js"]
		}
	}
	```