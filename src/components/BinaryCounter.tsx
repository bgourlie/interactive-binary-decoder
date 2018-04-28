import * as React from "react";
import * as PropTypes from "prop-types";
import { StyleSheet, css, globalStyles } from "../styles";

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
    justifyContent: "flex-end",
    fontSize: "1.5rem"
  },
  digit: {
    margin: "0 0.5rem",
    transition: "transform 100ms linear"
  },
  hideDigit: {
    transform: "scaleY(0)"
  }
});

interface BinaryCounterComponent {
  (props: Props): JSX.Element;
  displayName?: "BinaryCounter";
  propTypes?: PropTypes.ValidationMap<Props>;
}

interface Props {
  readonly value: number;
}

const digitClass = (hideDigit: boolean) => {
  return css(
    globalStyles.monospace,
    styles.digit,
    hideDigit && styles.hideDigit
  );
};

export const BinaryCounter: BinaryCounterComponent = (props: Props) => {
  const base10String = props.value.toString(10).padStart(3, "0");
  const base10MostSignificantDigitMatch = /[1-9]/.exec(base10String);
  const base10MostSignificantDigitIndex =
    base10MostSignificantDigitMatch !== null
      ? base10MostSignificantDigitMatch.index
      : 2;

  const base2String = props.value.toString(2).padStart(8, "0");
  const base2IndexOf1 = base2String.indexOf("1");
  const base2MostSignificantDigitIndex =
    base2IndexOf1 === -1 ? 7 : base2IndexOf1;

  return (
    <div className={css(styles.binaryCounter)}>
      <div className={css(styles.digitsContainer)}>
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
};

BinaryCounter.displayName = "BinaryCounter";

BinaryCounter.propTypes = {
  value: PropTypes.number.isRequired
};
