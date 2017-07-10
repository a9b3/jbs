## JBS Node

1. `yarn add jbs-node --dev`
2. Add fields to package.json.

	```json
	{
		"scripts": {
			"build": "./node_modules/jbs-node/bin.js build --input src --output build"
		},
		"babel": {
			"presets": ["./node_modules/jbs-node/configs/babel-preset-jbs-node.js"]
		}
	}
	```

### built file with import/export

Optional if you want to include a built version that still has import/export syntax supply the following flags to the build command.

```
./node_modules/jbs-node/bin.js build --input src --output build --es-input-file src/index.js --es-output-file build/index.es.js
```

Now you can add this to your package.json.

```json
{
	"module": "./build/index.es.js"
}
```