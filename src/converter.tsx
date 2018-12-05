import * as babel from "@babel/core";
import * as React from "react";

export const toJSX = (raw: string): string | null =>
  babel.transform(raw, {
    plugins: ["@babel/plugin-transform-react-jsx", "@babel/plugin-syntax-object-rest-spread"],
  }).code;

export const createConverter = (components: object) => (raw: string): React.ReactElement<any> => {
  const code = toJSX(raw);
  const keys = Object.keys(components);
  const values = keys.map(key => components[key]);
  const create = new Function("React", ...keys, `return props => ${code}`);
  return create(React, ...values)();
};
