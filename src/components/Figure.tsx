import * as React from "react";
import { StyleSheet, css } from "../styles";

const styles = StyleSheet.create({
  figure: {
    display: "flex",
    justifyContent: "center"
  },
  figureInner: {
    padding: "1rem",
    backgroundColor: "#dcdcdc"
  }
});

export const Figure = (props: any) => (
  <section className={css(styles.figure)}>
    <div className={css(styles.figureInner)}>{props.children}</div>
  </section>
);
