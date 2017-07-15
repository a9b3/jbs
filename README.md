# JBS

Javascript build scripts. Exposes two packages.

- `jbs-fe`
- `jbs-node`


## jbs-fe (Frontend apps/packages)

### Setup

1. `yarn add jbs-fe --dev`
2. Add fields to package.json.

	```json
	{
		"scripts": {
			"build": "./node_modules/jbs-fe/bin.js build",
			"start": "./node_modules/jbs-fe/bin.js dev",
			"test": "./node_modules/jbs-fe/bin.js test",
			"test:watch": "./node_modules/jbs-fe/bin.js test --single-run"
		},
		"babel": {
			"presets": ["./node_modules/jbs-fe/configs/babel-preset-jbs-fe.js"]
		}
	}
	```


### Assumed File Structure

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

### Developing a React App?

To support react, simply add `BABEL_REACT=true` when running any of the commands.

### Developing a Frontend Package?

To build a frontend package, use `build:package` command instead of `build`. It takes the same arguments as jbs-node build. (See Below)

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

## jbs-node (Node apps/packages)

### Setup

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

### Want to expose module with import/export syntax?

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


## Test

Tests all `*.spec.js` files.