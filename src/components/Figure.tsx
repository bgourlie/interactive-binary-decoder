import * as React from "react";
import * as PropTypes from "prop-types";
import { StyleSheet, css } from "../styles";

interface FigureComponent {
  propTypes?: PropTypes.ValidationMap<FigureProperties>;

  (props: FigureTypedProperties): React.ReactElement<FigureTypedProperties>;
}

interface FigureProperties extends JSX.IntrinsicAttributes {
  readonly label: any;
  readonly description: any;
  readonly children: any;
}

interface FigureTypedProperties extends FigureProperties {
  readonly label: string;
  readonly description: string;
  readonly children: JSX.Element;
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
  figureLabel: {
    fontSize: "0.8rem"
  }
});

export const Figure: FigureComponent = (props: FigureTypedProperties) => (
  <section className={css(styles.figure)}>
    <div className={css(styles.figureInner)}>
      <div className={css(styles.childrenContainer)}>{props.children}</div>
      <div className={css(styles.figureLabel)}>
        <span>{props.label}</span>
        <span>{props.description}</span>
      </div>
    </div>
  </section>
);

Figure.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.array
};
