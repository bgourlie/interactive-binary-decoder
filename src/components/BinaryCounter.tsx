import * as React from "react";
import { StyleSheet, css, globalStyles } from "../styles";
import { base2Digits } from "../binaryUtils";

const styles = StyleSheet.create({
  binaryCounter: {
    display: "flex",
    flexDirection: "column"
  },
  digits: {
    display: "flex",
    justifyContent: "right",
    fontSize: "1.5rem"
  },
  digit: {
    margin: "0 1rem 0 0"
  }
});

interface Props {
  readonly value: number;
}

const BinaryCounter = (props: Props) => (
  <div className={css(styles.binaryCounter)}>
    <div className={css(styles.digits)}>
      {props.value
        .toString(10)
        .padStart(3, "0")
        .split("")
        .map((digit, index) => (
          <div
            key={index}
            className={css(styles.digit, globalStyles.monospace)}
          >
            {digit}
          </div>
        ))}
    </div>
    <div className={css(styles.digits)}>
      {props.value
        .toString(2)
        .padStart(8, "0")
        .split("")
        .map((digit, index) => (
          <div
            key={index}
            className={css(styles.digit, globalStyles.monospace)}
          >
            {digit}
          </div>
        ))}
    </div>
  </div>
);

export default BinaryCounter;
