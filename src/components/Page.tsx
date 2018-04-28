import * as React from "react";
import * as PropTypes from "prop-types";
import { StyleSheet, css } from "../styles";

interface PageComponent {
  (props: Props): React.ReactElement<Props>;
  displayName?: "Page";
  propTypes?: PropTypes.ValidationMap<Props>;
}

interface Props {
  readonly children: JSX.Element | JSX.Element[];
}

const styles = StyleSheet.create({
  page: {
    width: "50rem",
    lineHeight: "1.6rem"
  },
  header: {
    fontSize: "1.5rem",
    lineHeight: "2.2rem",
    margin: "0 0 1rem 0"
  }
});

export const Page: PageComponent = (props: Props) => (
  <div className={css(styles.page)}>{props.children}</div>
);

Page.displayName = "Page";

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};
