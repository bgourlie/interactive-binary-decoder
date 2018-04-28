import * as React from "react";
import * as PropTypes from "prop-types";
import { StyleSheet, css } from "../styles";

interface PageHeaderComponent {
  (props: Props): React.ReactElement<Props>;
  propTypes?: PropTypes.ValidationMap<Props>;
  displayName?: "PageHeader";
}

interface Props {
  readonly children: string;
}

const styles = StyleSheet.create({
  pageHeader: {
    fontSize: "1.5rem",
    lineHeight: "2.2rem",
    margin: "0 0 1rem 0"
  }
});

export const PageHeader: PageHeaderComponent = (props: Props) => (
  <h1 className={css(styles.pageHeader)}>{props.children}</h1>
);

PageHeader.displayName = "PageHeader";

PageHeader.propTypes = {
  children: PropTypes.string
};
