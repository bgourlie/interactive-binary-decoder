import * as React from "react";
import { ChapterModel } from "../models";
import * as PropTypes from "prop-types";
import { css, StyleSheet } from "../styles";

interface TableOfContentsComponent {
  propTypes?: PropTypes.ValidationMap<TableOfContentsBaseProperties>;

  (props: TableOfContentsProperties): React.ReactElement<
    TableOfContentsProperties
  >;
}

interface TableOfContentsBaseProperties {
  readonly chapters: any;
  readonly currentChapter: any;
  readonly currentSection: any;
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
  ),
  currentChapter: PropTypes.number.isRequired,
  currentSection: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "0 1rem"
  },
  chapterList: {
    margin: "0",
    padding: "0",
    height: "100%",
    listStyleType: "none",
    borderRight: "1px solid #ccc"
  },
  chapter: {
    fontSize: "1.1rem",
    margin: "0 0 1rem 0"
  },
  chapterName: {
    margin: "0 0 0.5em 0",
    textDecoration: "underline"
  },
  sectionList: {
    fontSize: "1rem",
    margin: "0 0 0 0.5rem",
    padding: "0",
    listStyleType: "none"
  },
  sectionListItem: {
    margin: "0 0 0.5rem 0"
  },
  sectionLink: {
    color: "#aaa",
    textDecoration: "none",
    ":visited": {
      color: "#aaa"
    }
  },
  sectionActive: {
    color: "black !important",
    transform: "translateX(1rem)"
  }
});

const TableOfContents: TableOfContentsComponent = (
  props: TableOfContentsProperties
) => (
  <nav className={css(styles.root)}>
    <ul className={css(styles.chapterList)}>
      {props.chapters.map((chapter, index) => (
        <li key={index} className={css(styles.root)}>
          <header className={css(styles.chapterName)}>{chapter.name}</header>
          <ul className={css(styles.sectionList)}>
            {chapter.sections.map(section => {
              return (
                <li key={section.id} className={css(styles.sectionListItem)}>
                  <a className={css(styles.sectionLink)}>{section.name}</a>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  </nav>
);

TableOfContents.propTypes = TableOfContentsPropertyDefinition;

export default TableOfContents;
