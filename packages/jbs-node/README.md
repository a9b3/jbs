# jbs-node (Node apps/packages)

Defines a small API for developing node applications.

- `build`: Build source for web consumption (webpack)

## Setup

1. `yarn add jbs-node --dev`
2. Add the following fields to package.json.

  Example `package.json`.

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

## Expose module with import/export syntax

You just need to include the two additional flags to the `build` command.

```
--es-input-file
--es-output-file
```

*eg.*

```
./node_modules/jbs-node/bin.js build --input src --output build --es-input-file src/index.js --es-output-file build/index.es.js
```

Now you can add this to your package.json.

```json
{
	"module": "./build/index.es.js"
}
```
