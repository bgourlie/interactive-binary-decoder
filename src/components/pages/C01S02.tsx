import * as React from "react";
import * as PropTypes from "prop-types";
import {Figure} from "../Figure";
import BinaryCounter from "../BinaryCounter";
import {Page} from "../Page";
import {
  Chapter01Section02State,
  figure1TogglePlay,
  figure1UpdateValue
} from "../../reducer";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {PageHeader} from "../PageHeader";
import {StyleSheet, css, iconClass} from "../../styles";

interface C01S02Properties extends JSX.IntrinsicAttributes {
  readonly figure1Value: any;
  readonly figure1Playing: any;
  readonly doFigure1UpdateValue: any;
  readonly doFigure1TogglePlay: any;
}

interface C01S02TypedProperties extends C01S02Properties {
  readonly figure1Value: number;
  readonly figure1Playing: boolean;
  readonly doFigure1UpdateValue: (value: number, pause: boolean) => void;
  readonly doFigure1TogglePlay: () => void;
}

const styles = StyleSheet.create({
  icon: {
    padding: "0 0.25rem"
  },
  icons: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 0.25rem 0.25rem 0.25rem"
  },
  iconGroup: {
    display: "flex"
  }
});

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
          Humans are taught to think in terms of a base-10 number system, where
          a single digit has 10 distinct values, 0 through 9. When we need to
          represent a number greater than that which can be represented by a
          single digit, we introduce a new digit with a value of one, and reset
          the original digit to zero. Once we need to represent a number greater
          than that which can be represented by two digits, we introduce a third
          digit with a value of one and reset all previous digits to zero, and
          so on.
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
        <div className={css(styles.icons)}>
          <div className={css(styles.iconGroup)}>
            <div className={css(styles.icon)}>
              <span
                className={iconClass("first")}
                onClick={() => this.props.doFigure1UpdateValue(0, true)}
              />
            </div>
            <div className={css(styles.icon)}>
              <span
                className={iconClass(
                  this.props.figure1Playing ? "pause" : "play"
                )}
                onClick={() => this.props.doFigure1TogglePlay()}
              />
            </div>
            <div className={css(styles.icon)}>
              <span
                className={iconClass("last")}
                onClick={() => this.props.doFigure1UpdateValue(255, true)}
              />
            </div>
          </div>
          <div className={css(styles.iconGroup)}>
            <div className={css(styles.icon)}>
              <span
                className={iconClass("minus")}
                onClick={() =>
                  this.props.doFigure1UpdateValue(
                    this.props.figure1Value - 1,
                    true
                  )
                }
              />
            </div>
            <div className={css(styles.icon)}>
              <span
                className={iconClass("plus")}
                onClick={() =>
                  this.props.doFigure1UpdateValue(
                    this.props.figure1Value + 1,
                    true
                  )
                }
              />
            </div>
          </div>
        </div>
        <Figure
          number={1}
          description={"A base 10 number and its binary equivalent"}
        >
          <BinaryCounter value={this.props.figure1Value}/>
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

  static get propTypes(): React.ValidationMap<C01S02Properties> {
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

export const C01S02Container = connect(mapStateToProps, mapDispatchToProps)(
  C01S02
);
