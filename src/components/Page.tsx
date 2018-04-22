import * as React from "react";
import * as PropTypes from "prop-types";
import { StyleSheet, css } from "../styles";

interface PageComponent {
  propTypes?: PropTypes.ValidationMap<PageProperties>;
  (props: PageTypedProperties): React.ReactElement<PageTypedProperties>;
}

interface PageProperties extends JSX.IntrinsicAttributes {
  readonly children: any;
  readonly header: any;
}

interface PageTypedProperties extends PageProperties {
  readonly children: JSX.Element | JSX.Element[];
  readonly header: string;
}

const styles = StyleSheet.create({
  page: {
    lineHeight: "1.6rem"
  },
  header: {
    fontSize: "1.5rem",
    margin: "0 0 1rem 0"
  }
});

export const Page: PageComponent = (props: PageTypedProperties) => (
  <div className={css(styles.page)}>
    <h1 className={css(styles.header)}>{props.header}</h1>
    {props.children}
  </div>
);

Page.propTypes = {
  children: PropTypes.oneOf([PropTypes.array, PropTypes.object]),
  header: PropTypes.string.isRequired
};
