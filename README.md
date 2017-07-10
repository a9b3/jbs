# JBS

Javascript build scripts.

## Frontend

1. `yarn add jbs-fe --dev`
2. Add fields to package.json.

	```json
	{
		"scripts": {
			"build": "NODE_ENV=prod ./node_modules/jbs-fe/bin.js build",
			"dev": "./node_modules/jbs-fe/bin.js dev",
			"test": "NODE_ENV=test ./node_modules/jbs-fe/bin.js test",
			"test:watch": "NODE_ENV=test ./node_modules/jbs-fe/bin.js test --single-run"
		},
		"babel": {
			"presets": ["./node_modules/jbs-fe/configs/babel-preset-jbs-fe.js"]
		}
	}
	```


### File Structure

You can override the file structure with the following flags supplied to build command.

```js
--app-index
--output-path
--html-index
--resolve-node-modules
--favicon-path
```

Default file structure.

```
package.json
./src/index.html
./src/app/index.js
```

To change you just need to supply 3 flags.

```
--app-index ./src/app/index.js
--html-index ./src/index.html
--context ./src
```

### React

To support react, simply add `BABEL_REACT=true` when running any of the commands.

### Package

To build a frontend package, use `build:package` command instead of build. It takes the same arguments as jbs-node build. (See Below)

```json
{
	"scripts": {
		"build": "./node_modules/jbs-fe/bin.js build:package --input src --output build"
	},
	"babel": {
		"presets": ["./node_modules/jbs-fe/configs/babel-preset-jbs-fe.js"]
	}
}
```

## Test

Tests all `*.spec.js` files.

## Node

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
