import * as React from "react";
import Chapter from "./Chapter";
import { ChapterModel } from "../models";
import * as PropTypes from "prop-types";

interface TableOfContentsComponent {
  propTypes?: PropTypes.ValidationMap<TableOfContentsBaseProperties>;

  (props: TableOfContentsProperties): React.ReactElement<
    TableOfContentsProperties
  >;
}

interface TableOfContentsBaseProperties {
  readonly chapters: any;
}

interface TableOfContentsProperties
  extends TableOfContentsBaseProperties,
    JSX.IntrinsicAttributes {
  readonly chapters: ChapterModel[];
}

const TableOfContentsPropertyDefinition: TableOfContentsBaseProperties = {
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sections: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired
        })
      )
    })
  )
};

const TableOfContents: TableOfContentsComponent = (
  props: TableOfContentsProperties
) => (
  <nav id="table-of-contents">
    <ul>
      {props.chapters.map(chapter => (
        <Chapter key={chapter.id} chapter={chapter} />
      ))}
    </ul>
  </nav>
);

TableOfContents.propTypes = TableOfContentsPropertyDefinition;

export default TableOfContents;
