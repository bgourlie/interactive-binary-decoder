import * as React from "react";

export default class TableOfContents extends React.PureComponent {
  render(): React.ReactNode {
    return (
      <section id="table-of-contents">
        <ul>
          <li>Introduction</li>
          <li>Representing numbers in binary</li>
          <li>Integer Representations</li>
        </ul>
      </section>
    );
  }
}
