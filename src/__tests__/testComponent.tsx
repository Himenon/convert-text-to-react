import * as React from "react";

interface TestComponentProps {
  a: number;
  b: number;
  c: number;
  d: number;
}

export class TestComponent extends React.Component<TestComponentProps, {}> {
  public render() {
    return (
      <div className="test-component">
        {this.props.children} {this.props.a * this.props.b + this.props.c + this.props.d}
      </div>
    );
  }
}
