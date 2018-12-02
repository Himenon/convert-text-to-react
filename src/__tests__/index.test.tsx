import * as ReactDOM from "react-dom/server";
import { parseIncludeReactComponent, transformText } from "../index";

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
    const transformResult = transformText(INPUT_TEXT);
    expect(removeSpaces(transformResult!)).toEqual(removeSpaces(expectTransformResult));
});

test("parseIncludeReactComponent", () => {
  const transformResult = transformText(INPUT_TEXT);
  const reactDomValue = parseIncludeReactComponent(transformResult!);
  const result = ReactDOM.renderToStaticMarkup(reactDomValue);
  expect(result).toEqual(`<div class="my-component">Result of multiplication: -20</div>`);
});
