import * as React from "react";
import * as PropTypes from "prop-types";
import { Figure } from "../Figure";
import { BinaryCounter } from "../BinaryCounter";
import { Page } from "../Page";
import {
  Chapter01Section02State,
  figure1TogglePlay,
  figure1UpdateValue
} from "../../reducer";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { PageHeader } from "../PageHeader";
import { StyleSheet, css } from "../../styles";
import { PlayerControls } from "../PlayerControls";
import { IncrementControls } from "../IncrementControls";

interface StateProps {
  readonly figure1Value: number;
  readonly figure1Playing: boolean;
}

interface DispatchProps {
  readonly doFigure1UpdateValue: (value: number, pause: boolean) => void;
  readonly doFigure1TogglePlay: () => void;
}

type Props = StateProps & DispatchProps;

const styles = StyleSheet.create({
  icon: {},
  figure1Controls: {
    display: "flex",
    justifyContent: "center",
    padding: "0 0.25rem 0.25rem 0.25rem"
  }
});

export class C01S02 extends React.PureComponent<Props> {
  private timerId: number | null = null;

  render(): React.ReactNode {
    return (
      <Page>
        <PageHeader>Representing Numbers in Binary</PageHeader>
        <p>
          Representing numbers in binary is extremely straightforward and
          intuitive. While it may not seem like it at first, once we start
          thinking of number representations in more abstract terms, we'll see
          that binary representations are really no different than numbers as we
          normally think of them, they just look a bit different.
        </p>

        <h3>A Quick Look at Numeral Systems</h3>
        <p>
          Humans are taught to think in terms of a base-10 numeral system, where
          a single digit has 10 distinct values, 0 through 9. When we need to
          represent a number greater than that which can be represented by a
          single digit, we introduce a new digit with a value of one, and reset
          the original digit to zero. Once we need to represent a number greater
          than that which can be represented by two digits, we introduce a third
          digit with a value of one and reset all previous digits to zero, and
          so on.
        </p>
        <p>
          All that's needed to convey <i>any</i> number are two distinct values:
          A value to represent zero, and a value to represent one, making binary
          data perfectly suitable for representing numbers. Unlike a base-10
          numeral system where a single digit has 10 distinct values, a single
          digit in binary has 2 distinct values, 0 and 1. In other words, we can
          interpret binary data as a number using a base-2 numeral system.
        </p>
        <p>
          As you can see in Figure 1 below, the same general rules apply to
          counting in a base-2 system as they do in a base-10 system. The only
          difference is the number of digits required to represent the same
          number.
        </p>
        <Figure
          number={1}
          description={"A base 10 number and its binary equivalent"}
        >
          <BinaryCounter value={this.props.figure1Value} />
        </Figure>
        <div className={css(styles.figure1Controls)}>
          <PlayerControls
            playState={this.props.figure1Playing ? "pause" : "play"}
            togglePlayClickHandler={() => this.props.doFigure1TogglePlay()}
            goFirstClickHandler={() => this.props.doFigure1UpdateValue(0, true)}
            goLastClickHandler={() =>
              this.props.doFigure1UpdateValue(255, true)
            }
          />
          <IncrementControls
            incrementClickHandler={() =>
              this.props.doFigure1UpdateValue(this.props.figure1Value + 1, true)
            }
            decrementClickHandler={() =>
              this.props.doFigure1UpdateValue(this.props.figure1Value - 1, true)
            }
          />
        </div>
        <p>
          Since humans have been conditioned to interpret numbers in terms of
          base-10, we have an intuitive understanding of a base-10 number's
          size. For example, we can tell at a glance that 1,000,000 is a lot in
          terms of dollars, but what if we interpreted those same digits as
          binary? We've established that we need more digits to represent
          numbers in binary as opposed to base-10, so we can safely say that it
          represents fewer than one million. It turns out it represents a much
          smaller number&mdash;64 to be exact.
        </p>
        <p>
          Like counting, there's a common approach to determining the value of a
          number represented by any numeral system, and it's actually pretty
          simple. First, we'll establish a few terms:
          <ul>
            <li>
              <i>Base</i> : The number of distinct values a single digit can
              represent using the given numeral system.
            </li>
            <li>
              <i>Magnitude</i> : The position of the digit, where the rightmost
              digit has a magnitude of one, with each subsequent digit to the
              left increasing in magnitude by one.
            </li>
          </ul>
        </p>
      </Page>
    );
  }

  componentDidMount() {
    if (this.timerId === null) {
      this.timerId = window.setInterval(() => {
        if (this.props.figure1Playing) {
          this.props.doFigure1UpdateValue(this.props.figure1Value + 1, false);
        }
      }, 500);
    }
  }

  componentWillUnmount() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  static get propTypes(): React.ValidationMap<Props> {
    return {
      figure1Value: PropTypes.number.isRequired,
      doFigure1UpdateValue: PropTypes.func.isRequired,
      doFigure1TogglePlay: PropTypes.func.isRequired
    };
  }
}

const mapStateToProps = (state: Chapter01Section02State) => {
  return {
    figure1Value: state.figure1Value,
    figure1Playing: state.figure1Playing
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    doFigure1UpdateValue: (value: number, pause: boolean) =>
      dispatch(figure1UpdateValue(value, pause)),
    doFigure1TogglePlay: () => dispatch(figure1TogglePlay())
  };
};

export const C01S02Container = connect<
  StateProps,
  DispatchProps,
  {},
  Chapter01Section02State
>(mapStateToProps, mapDispatchToProps)(C01S02);
