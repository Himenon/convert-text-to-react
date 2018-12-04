import * as ReactDOM from "react-dom/server";
import { createConverter, ExampleComponent, toJSX } from "../index";

const INPUT_TEXT = "<ExampleComponent x={1} y={-20}>Result of multiplication:</ExampleComponent>";

const expectTransformResult = `
React.createElement(ExampleComponent, {
  x: 1,
  y: -20
}, "Result of multiplication:");`;

// 改行や空白をすべて削除し、1行の文字列にする
const removeSpaces = (inputString: string): string => inputString.replace(/\r?\n|\r|\n|\s/g, "").trim();

const components = {
  ExampleComponent,
};

test("transformText", () => {
  const transformResult = toJSX(INPUT_TEXT);
  expect(removeSpaces(transformResult!)).toEqual(removeSpaces(expectTransformResult));
});

test("parseIncludeReactComponent", () => {
  const jsxText = toJSX(INPUT_TEXT);
  const converter = createConverter(components);
  const result = ReactDOM.renderToStaticMarkup(converter(jsxText!));
  expect(result).toEqual(`<div class="my-component">Result of multiplication: -20</div>`);
});
