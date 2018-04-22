import * as React from "react";
import * as PropTypes from "prop-types";
import { StyleSheet, css } from "../styles";

interface FigureComponent {
  propTypes?: PropTypes.ValidationMap<FigureProperties>;

  (props: FigureTypedProperties): React.ReactElement<FigureTypedProperties>;
}

interface FigureProperties extends JSX.IntrinsicAttributes {
  readonly number: any;
  readonly description: any;
  readonly children: any;
}

interface FigureTypedProperties extends FigureProperties {
  readonly number: number;
  readonly description: string;
  readonly children: JSX.Element | JSX.Element;
}

const styles = StyleSheet.create({
  figure: {
    display: "flex",
    justifyContent: "center"
  },
  figureInner: {
    display: "flex",
    flexDirection: "column",
    padding: "0.5rem 1rem 0.1rem 1rem",
    backgroundColor: "#dcdcdc"
  },
  childrenContainer: {
    padding: "0 0 0.5rem 0"
  },
  figureText: {
    fontSize: "0.8rem"
  },
  label: {
    fontWeight: "bold"
  },
  description: {
    paddingLeft: "0.5rem"
  }
});

export const Figure: FigureComponent = (props: FigureTypedProperties) => (
  <section className={css(styles.figure)}>
    <div className={css(styles.figureInner)}>
      <div className={css(styles.childrenContainer)}>{props.children}</div>
      <div className={css(styles.figureText)}>
        <span className={css(styles.label)}>Figure {props.number}.</span>
        <span className={css(styles.description)}>{props.description}</span>
      </div>
    </div>
  </section>
);

Figure.propTypes = {
  number: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.any
};
