import * as babel from "@babel/core";
import * as React from "react";

export const toCode = (raw: string): string | null =>
  babel.transform(raw, {
    plugins: ["@babel/plugin-transform-react-jsx"],
  }).code;

export const convert = (raw: string, components: object): React.ReactElement<any> => {
  const code = toCode(raw);
  const keys = Object.keys(components);
  const values = keys.map(key => components[key]);
  const create = new Function("React", ...keys, `return ${code}`);
  return create(React, ...values);
};
