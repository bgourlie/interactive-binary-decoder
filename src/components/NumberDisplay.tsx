import * as React from "react";
import * as PropTypes from "prop-types";
import { css, StyleSheet, globalStyles } from "../styles";

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

interface Props {
  base: number;
  value: number;
  zeroPadding?: number;
  hideInsignificantDigits?: boolean;
}

interface CachedState {
  readonly base: number;
  readonly digits: string[];
  readonly mostSignificantDigitRegex: RegExp;
}

export class NumberDisplay extends React.PureComponent<Props> {
  private cachedState?: CachedState;

  render(): React.ReactNode {
    if (!this.cachedState || this.cachedState.base !== this.props.base) {
      const digits = [];
      for (let i = 0; i < this.props.base; i++) {
        digits.push(i.toString(this.props.base));
      }

      const mostSignificantDigitRegex = new RegExp(`[^${digits[0]}]`);

      this.cachedState = {
        base: this.props.base,
        digits: digits,
        mostSignificantDigitRegex: mostSignificantDigitRegex
      };
    }

    const numberString = this.props.value
      .toString(this.cachedState.base)
      .padStart(this.props.zeroPadding || 0, this.cachedState.digits[0]);

    const mostSignificantDigitMatch = this.cachedState.mostSignificantDigitRegex.exec(
      numberString
    );

    const mostSignificantDigitIndex =
      mostSignificantDigitMatch !== null ? mostSignificantDigitMatch.index : 2;

    console.log(mostSignificantDigitIndex);

    return (
      <div className={css(styles.digits)}>
        {numberString.split("").map((digit, index) => (
          <div
            key={index}
            className={digitClass(
              !!this.props.hideInsignificantDigits &&
                index < mostSignificantDigitIndex
            )}
          >
            {digit}
          </div>
        ))}
      </div>
    );
  }

  static get propTypes(): React.ValidationMap<Props> {
    return {
      base: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
      zeroPadding: PropTypes.number,
      hideInsignificantDigits: PropTypes.bool
    };
  }
}
