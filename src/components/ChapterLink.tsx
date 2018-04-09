import * as React from "react";
import { NavLink } from "react-router-dom";

export default class ChapterLink extends React.Component<{ to: string }> {
  render(): React.ReactElement<NavLink> {
    return (
      <NavLink activeClassName="active" exact to={this.props.to}>
        {this.props.children}
      </NavLink>
    );
  }
}
