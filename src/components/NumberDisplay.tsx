import * as React from "react";
import * as PropTypes from "prop-types";
import { css, StyleSheet, globalStyles } from "../styles";
import { number } from "prop-types";

const styles = StyleSheet.create({
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

const digitClass = (hideDigit: boolean) => {
  return css(
    globalStyles.monospace,
    styles.digit,
    hideDigit && styles.hideDigit
  );
};

interface NumberDisplayComponent {
  (props: Props): React.ReactElement<Props>;
  displayName?: "NumberDisplay";
  propTypes?: PropTypes.ValidationMap<Props>;
}

interface Props {
  base: number;
  value: number;
  zeroPadding?: number;
  hideInsignificantDigits?: boolean;
}

export const NumberDisplay: NumberDisplayComponent = (props: Props) => {
  const zeroNumeral = (0).toString(props.base);
  const mostSignificantDigitRegex = new RegExp(`[^${zeroNumeral}]`);

  const numberString = props.value
    .toString(props.base)
    .padStart(props.zeroPadding || 0, zeroNumeral);

  const mostSignificantDigitMatch = mostSignificantDigitRegex.exec(
    numberString
  );

  const mostSignificantDigitIndex =
    mostSignificantDigitMatch !== null
      ? mostSignificantDigitMatch.index
      : numberString.length - 1;

  return (
    <div className={css(styles.digits)}>
      {numberString.split("").map((digit, index) => (
        <div
          key={index}
          className={digitClass(
            !!props.hideInsignificantDigits && index < mostSignificantDigitIndex
          )}
        >
          {digit}
        </div>
      ))}
    </div>
  );
};

NumberDisplay.displayName = "NumberDisplay";

NumberDisplay.propTypes = {
  base: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  zeroPadding: PropTypes.number,
  hideInsignificantDigits: PropTypes.bool
};
