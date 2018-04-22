import * as React from "react";
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
    justifyContent: "right",
    fontSize: "1.5rem"
  },
  digit: {
    margin: "0 0.5rem"
  }
});

interface Props {
  readonly value: number;
}

const BinaryCounter = (props: Props) => (
  <div className={css(styles.binaryCounter)}>
    <div className={css(styles.digitsContainer)}>
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
  </div>
);

export default BinaryCounter;
