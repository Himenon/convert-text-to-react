import * as ReactDOM from "react-dom/server";
import { convert, toJSX } from "../index";

const INPUT_TEXT =
  "<CustomComponent x={1} y={-20}>Result of multiplication:</CustomComponent>";

const expectTransformResult = `
React.createElement(CustomComponent, {
  x: 1,
  y: -20
}, "Result of multiplication:");`;

// 改行や空白をすべて削除し、1行の文字列にする
const removeSpaces = (inputString: string): string => inputString.replace(/\r?\n|\r|\n|\s/g, "").trim();

test("transformText", () => {
  const transformResult = toJSX(INPUT_TEXT);
  expect(removeSpaces(transformResult!)).toEqual(removeSpaces(expectTransformResult));
});

test("parseIncludeReactComponent", () => {
  const transformResult = toJSX(INPUT_TEXT);
  const reactDomValue = convert(transformResult!);
  const result = ReactDOM.renderToStaticMarkup(reactDomValue);
  expect(result).toEqual(`<div class="my-component">Result of multiplication: -20</div>`);
});
