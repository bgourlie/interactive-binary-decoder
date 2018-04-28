import * as React from "react";
import * as PropTypes from "prop-types";
import { StyleSheet, css } from "../styles";

interface PageHeaderComponent {
  propTypes?: PropTypes.ValidationMap<PageProperties>;

  (props: PageHeaderTypedProperties): React.ReactElement<
    PageHeaderTypedProperties
  >;
}

interface PageProperties extends JSX.IntrinsicAttributes {
  readonly children: any;
}

interface PageHeaderTypedProperties extends PageProperties {
  readonly children: string;
}

const styles = StyleSheet.create({
  pageHeader: {
    fontSize: "1.5rem",
    lineHeight: "2.2rem",
    margin: "0 0 1rem 0"
  }
});

export const PageHeader: PageHeaderComponent = (
  props: PageHeaderTypedProperties
) => <h1 className={css(styles.pageHeader)}>{props.children}</h1>;

PageHeader.propTypes = {
  children: PropTypes.string
};
