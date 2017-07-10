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
	
	
## File Structure

You can override the file structure with the following flags supplied to build command.

```js
/*
 * This file takes these arguments via the appPaths module.
 *
 * appPaths.appIndex
 * appPaths.outputPath
 * appPaths.htmlIndex
 * appPaths.resolveNodeModules
 * appPaths.faviconPath
 */
```

Default file structure.

```
package.json
./src/index.html
./src/app/index.js
```

To change you just need to supply 3 flags.

```
--app-index=./src/app/index.js
--html-index=./src/index.html
--context=./src
```

## React

To support react, simply add `BABEL_REACT=true` when running any of the commands.