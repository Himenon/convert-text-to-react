import * as ReactDOM from "react-dom/server";
import { convert, ExampleComponent, toCode } from "../index";
import { TestComponent } from "./testComponent";

const TEST_CODE_1 = "<ExampleComponent x={1} y={-20}>Result of multiplication:</ExampleComponent>";
const TEST_CODE_2 = `<TestComponent {...{ a: 1, b: 2, c: 3, d: 4 }} />`;
const TEST_CODE_3 = `<TestComponent {...{ a: 1, b: 2, c: 3, d: 4 }}>
<ExampleComponent x={1} y={-20}>Result of multiplication:</ExampleComponent>
</TestComponent>`;

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

test("JSXの変換ができるか", () => {
  const transformResult = toCode(TEST_CODE_1);
  expect(removeSpaces(transformResult!)).toEqual(removeSpaces(expectTransformResult));
});

test("ExampleComponentの描画", () => {
  const convertedComponent = convert(TEST_CODE_1, components);
  const result = ReactDOM.renderToStaticMarkup(convertedComponent);
  expect(result).toEqual(`<div class="my-component">Result of multiplication: -20</div>`);
});

test("Spread Operatorの試験", () => {
  const convertedComponent = convert(TEST_CODE_2, { TestComponent });
  const result = ReactDOM.renderToStaticMarkup(convertedComponent);
  expect(result).toEqual('<div class="test-component"> 9</div>');
});

test("childrenの試験", () => {
  const convertedComponent = convert(TEST_CODE_3, { TestComponent, ExampleComponent });
  const result = ReactDOM.renderToStaticMarkup(convertedComponent);
  expect(result).toEqual('<div class="test-component"><div class="my-component">Result of multiplication: -20</div> 9</div>');
});
