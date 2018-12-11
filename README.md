# convert-text-to-react

[![Build Status](https://travis-ci.org/Himenon/convert-text-to-react.svg?branch=master)](https://travis-ci.org/Himenon/convert-text-to-react)

# Usage

```sh
npm i convert-text-to-react
```

```ts
import * as ReactDOM from "react-dom/server";
import { convert, ExampleComponent } from "convert-text-to-react";

const rawText = "<ExampleComponent x={1} y={-20}>Result of multiplication:</ExampleComponent>";

const components = {
  ExampleComponent,
}

const result = convert(rawText, components);

console.log(ReactDOM.renderToStaticMarkup(result);
// <div class="my-component">Result of multiplication: -20</div>
```

# Licence

MIT

# Author

[Himenon](https://github.com/Himenon)
