import * as objectRestSpread from "@babel/plugin-proposal-object-rest-spread";
import * as transformJSX from "@babel/plugin-transform-react-jsx";
import * as babelStandAlone from "@babel/standalone";
import * as React from "react";

export const toJSX = (raw: string): string | null =>
  babelStandAlone.transform(raw, {
    plugins: [transformJSX, objectRestSpread],
  }).code;

interface CustomComponentProps {
  x: number;
  y: number;
}

class CustomComponent extends React.Component<CustomComponentProps, {}> {
  public render() {
    return (
      <div className="my-component">
        {this.props.children} {this.props.x * this.props.y}
      </div>
    );
  }
}

export const convert = (funcText: string): React.ReactElement<any> => {
  const components = { CustomComponent };
  const keys = Object.keys(components);
  const values = keys.map(key => components[key]);
  const create = new Function("React", ...keys, `return props => ${funcText}`);
  return create(React, ...values)();
};
