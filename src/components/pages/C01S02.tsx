import * as React from "react";
import * as PropTypes from "prop-types";
import { Figure } from "../Figure";
import BinaryCounter from "../BinaryCounter";
import { Page } from "../Page";
import { ApplicationState, decrementFigure1Value } from "../../reducer";
import { Dispatch } from "redux";
import { connect } from "react-redux";

interface C01S02Properties extends JSX.IntrinsicAttributes {
  readonly figure1Value: any;
  readonly doDecrementFigure1Value: any;
}

interface C01S02TypedProperties extends C01S02Properties {
  readonly figure1Value: number;
  readonly doDecrementFigure1Value: () => void;
}

export class C01S02 extends React.Component<C01S02TypedProperties> {
  private timerId: number | null = null;

  render(): React.ReactNode {
    return (
      <Page header={"Representing Numbers in Binary"}>
        <p>
          Few things are naturally represented in binary, and numbers are one of
          those things. We really only need to make one small tweak in our
          natural way of thinking to understand how numbers are encoded in
          binary: We need to think of numbers in terms of two symbols as opposed
          to 10. In other words, we need to learn to think in a base 2 number
          system instead of base 10.
        </p>
        <Figure
          number={1}
          description={"A base 10 number and its binary equivalent"}
        >
          <BinaryCounter value={this.props.figure1Value} />
        </Figure>
      </Page>
    );
  }

  componentDidMount() {
    if (this.timerId === null) {
      this.timerId = window.setInterval(
        () => this.props.doDecrementFigure1Value(),
        1000
      );
    }
  }

  componentWillUnmount() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  static get propTypes(): React.ValidationMap<C01S02Properties> {
    return {
      figure1Value: PropTypes.number.isRequired,
      doDecrementFigure1Value: PropTypes.func.isRequired
    };
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const figure1Value =
    state.selectedChapter === 1 && state.selectedSection === 2
      ? state.figure1Value
      : 255;
  return {
    figure1Value: figure1Value
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    doDecrementFigure1Value: () => dispatch(decrementFigure1Value())
  };
};

export const C01S02Container = connect(mapStateToProps, mapDispatchToProps)(
  C01S02
);
