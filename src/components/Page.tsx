import * as React from "react";
import * as PropTypes from "prop-types";
import {StyleSheet, css} from "../styles";

interface PageComponent {
  propTypes?: PropTypes.ValidationMap<PageProperties>;

  (props: PageTypedProperties): React.ReactElement<PageTypedProperties>;
}

interface PageProperties extends JSX.IntrinsicAttributes {
  readonly children: any;
}

interface PageTypedProperties extends PageProperties {
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

export const Page: PageComponent = (props: PageTypedProperties) => (
  <div className={css(styles.page)}>{props.children}</div>
);

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};
