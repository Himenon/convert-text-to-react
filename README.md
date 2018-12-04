# convert-text-to-react

[![Build Status](https://travis-ci.org/Himenon/convert-text-to-react.svg?branch=master)](https://travis-ci.org/Himenon/convert-text-to-react)

# Usage

```sh
npm i convert-text-to-react
```

```ts
import * as ReactDOM from "react-dom/server";
import { toJSX, convert } from "convert-text-to-react";

const inputText = "<CustomComponent x={1} y={-20}>Result of multiplication:</CustomComponent>";
const jsxText = toJSX(inputText);
const value = convert(jsxText!);

console.log(ReactDOM.renderToStaticMarkup(value);)
// <div class="my-component">Result of multiplication: -20</div>
```

# Licence

MIT

# Author

[Himenon](https://github.com/Himenon)
