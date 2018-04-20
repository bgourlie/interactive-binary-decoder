import * as React from "react";
import { StyleSheet, css } from "../styles";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  digits: {
    display: "flex",
    justifyContent: "right",
    flexDirection: "row",
    fontSize: "1.5rem",
    fontFamily: "monospace"
  },
  digit: {
    border: "1px solid black",
    margin: "0 1rem 0 0",
    padding: "0.5rem"
  }
});

interface Props {
  base2Digits: number[];
  base10Digits: number[];
}

const BinaryCounter = (props: Props) => (
  <div className={css(styles.container)}>
    <div className={css(styles.digits)}>
      {props.base2Digits.map((digit, index) => (
        <div key={index} className={css(styles.digit)}>
          {digit}
        </div>
      ))}
    </div>
    <div className={css(styles.digits)}>
      {props.base10Digits.map((digit, index) => (
        <div key={index} className={css(styles.digit)}>
          {digit}
        </div>
      ))}
    </div>
  </div>
);

export default BinaryCounter;
