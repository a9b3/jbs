# jbs-base-babel

Standard set of plugins/presets meant to be extended in the other jbs packages.

## Suggested usage

[Use via package.json](https://babeljs.io/docs/usage/babelrc/#use-via-package-json), put the following inside `package.json`.

```js
{
  // ...
  "babel": {
    "presets": [
      "./node_modules/jbs-fe/configs/babel-preset-jbs-fe.js"
    ],
    "plugins": [
		// ...
    ]
  },
  // ...
}
```

## babel-build.js

A small utility function that just calls babel cli with the given
inputs/outputs. This is useful since the `babel-cli` dependency can just live in
this package, the invocation and thus requirement to know the path of the
executable can be abstracted away and only the functionality of transpiling
input to output is exposed.

## Links

- [Creating a preset](https://babeljs.io/docs/plugins/#creating-a-preset)
