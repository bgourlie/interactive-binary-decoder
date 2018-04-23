import * as React from "react";
import * as PropTypes from "prop-types";
import { StyleSheet, css, globalStyles, iconClass } from "../styles";

const styles = StyleSheet.create({
  binaryCounter: {
    display: "flex",
    justifyContent: "center"
  },
  digitsContainer: {
    display: "flex",
    flexDirection: "column"
  },
  digits: {
    display: "flex",
    justifyContent: "right",
    fontSize: "1.5rem"
  },
  digit: {
    margin: "0 0.5rem",
    transition: "transform 100ms linear"
  },
  hideDigit: {
    transform: "scaleY(0)"
  },
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

interface TypedProps {
  readonly value: number;
  readonly playing: boolean;
  readonly doUpdateValue: (value: number) => void;
  readonly doTogglePlay: () => void;
}

const digitClass = (hideDigit: boolean) => {
  return css(
    globalStyles.monospace,
    styles.digit,
    hideDigit && styles.hideDigit
  );
};

class BinaryCounter extends React.Component<TypedProps> {
  render(): React.ReactNode {
    const base10String = this.props.value.toString(10).padStart(3, "0");
    const base10MostSignificantDigitMatch = /[1-9]/.exec(base10String);
    const base10MostSignificantDigitIndex =
      base10MostSignificantDigitMatch !== null
        ? base10MostSignificantDigitMatch.index
        : 2;

    const base2String = this.props.value.toString(2).padStart(8, "0");
    const base2IndexOf1 = base2String.indexOf("1");
    const base2MostSignificantDigitIndex =
      base2IndexOf1 === -1 ? 7 : base2IndexOf1;

    return (
      <div className={css(styles.binaryCounter)}>
        <div className={css(styles.digitsContainer)}>
          <div className={css(styles.icons)}>
            <div className={css(styles.iconGroup)}>
              <div className={css(styles.icon)}>
                <span className={iconClass("first")} />
              </div>
              <div className={css(styles.icon)}>
                <span className={iconClass("pause")} />
              </div>
              <div className={css(styles.icon)}>
                <span className={iconClass("last")} />
              </div>
            </div>
            <div className={css(styles.iconGroup)}>
              <div className={css(styles.icon)}>
                <span
                  className={iconClass("minus")}
                  onClick={() => this.props.doUpdateValue(this.props.value - 1)}
                />
              </div>
              <div className={css(styles.icon)}>
                <span
                  className={iconClass("plus")}
                  onClick={() => this.props.doUpdateValue(this.props.value + 1)}
                />
              </div>
            </div>
          </div>
          <div className={css(styles.digits)}>
            {base10String.split("").map((digit, index) => (
              <div
                key={index}
                className={digitClass(index < base10MostSignificantDigitIndex)}
              >
                {digit}
              </div>
            ))}
          </div>
          <div className={css(styles.digits)}>
            {base2String.split("").map((digit, index) => (
              <div
                key={index}
                className={digitClass(index < base2MostSignificantDigitIndex)}
              >
                {digit}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  static get propTypes(): React.ValidationMap<TypedProps> {
    return {
      value: PropTypes.number.isRequired,
      playing: PropTypes.bool.isRequired,
      doUpdateValue: PropTypes.func.isRequired,
      doTogglePlay: PropTypes.func.isRequired
    };
  }
}

export default BinaryCounter;
