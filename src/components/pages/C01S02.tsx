import * as React from "react";
import * as PropTypes from "prop-types";
import { Figure } from "../Figure";
import BinaryCounter from "../BinaryCounter";
import { Page } from "../Page";
import { ApplicationState, incrementFigure1Value } from "../../reducer";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { PageHeader } from "../PageHeader";

interface C01S02Properties extends JSX.IntrinsicAttributes {
  readonly figure1Value: any;
  readonly doIncrementFigure1Value: any;
}

interface C01S02TypedProperties extends C01S02Properties {
  readonly figure1Value: number;
  readonly doIncrementFigure1Value: () => void;
}

export class C01S02 extends React.Component<C01S02TypedProperties> {
  private timerId: number | null = null;

  render(): React.ReactNode {
    return (
      <Page>
        <PageHeader>Representing Numbers in Binary</PageHeader>
        <p>
          Representing numbers in binary is extremely straightforward and
          intuitive. While it may not seem like it at first, once we start
          thinking of numbers in abstract terms, we'll see that numbers
          represented in binary are really no different than numbers as we
          normally think of them, they just look a bit different.
        </p>

        <h3>A Quick Look at Number Systems</h3>
        <p>
          Humans are taught to think in terms of the base-10 number system,
          where a single digit can have 10 distinct values, 0 through 9. When we
          need to represent a number greater than that which can be represented
          by a single digit, we introduce a new digit with a value of one, and
          reset the original digit to zero. Once we need to represent a number
          greater than that which can be represented by two digits, we introduce
          a third digit with a value of one and reset all previous digits to
          zero, and so on.
        </p>
        <p>
          Any given number system requires at least two distinct values: A value
          to represent zero, and a value to represent one. This means that
          binary data meets the minimum requirement to represent <i>any</i>&nbsp;number.
          Unlike a base-10 number system where a single digit has 10 distinct
          values, a single digit in binary has 2 distinct values, 0 and 1. In
          other words, we can interpret binary data as a number using a base-2
          number system.
        </p>
        <p>
          As you can see in Figure 1 below, the same general rules apply to
          counting in a base-2 number system as they do in a base-10 number
          system. The only difference is the number of digits required to
          represent the same number.
        </p>
        <Figure
          number={1}
          description={"A base 10 number and its binary equivalent"}
        >
          <BinaryCounter value={this.props.figure1Value} />
        </Figure>
        <p>
          Since we're used to interpreting numbers in base-10, we have an
          intuitive understanding of a base-10 number's magnitude. For example,
          we can tell at a glance that 1,000,000 would be a lot in terms of
          dollars, but what if we interpreted those same digits as binary? It
          turns out those same digits represent a much smaller number in
          binary&mdash;64 to be exact.
        </p>
      </Page>
    );
  }

  componentDidMount() {
    if (this.timerId === null) {
      this.timerId = window.setInterval(
        () => this.props.doIncrementFigure1Value(),
        2000
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
      doIncrementFigure1Value: PropTypes.func.isRequired
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
    doIncrementFigure1Value: () => dispatch(incrementFigure1Value())
  };
};

export const C01S02Container = connect(mapStateToProps, mapDispatchToProps)(
  C01S02
);
