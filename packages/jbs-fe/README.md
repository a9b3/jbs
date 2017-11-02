# jbs-fe (Frontend apps/packages)

Defines a small API for developing frontend javascript.

- `dev`: Active development (webpack-dev)
- `build`: Build source for web consumption (webpack)
- `build:package`: Build source for application consumption (babel)
- `test`: Test `*.spec.js` files (mocha, karma)

## Setup

1. `yarn add jbs-fe --dev`
2. Add fields to `package.json`

	Example `package.json`.

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

## Include Stats

To include stats in the build add the env var `INCLUDE_STATS=true`.


## File Structure

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

## React App

To support react, simply add `BABEL_REACT=true` when running any of the commands. This will add `babel-preset-react` and `react-hot-loader/babel` to babel configurations. 

## Frontend Package

To build a frontend package, use `build:package` command instead of `build`. It takes the same arguments.

Example `package.json`.

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

## Todo

- Export karma and webpack configs so consumers can extend them, decouple configs from scripts.