import * as React from "react";
import * as Paths from "../paths";
import { ChapterModel } from "../models";
import * as PropTypes from "prop-types";
import { css, StyleSheet } from "../styles";
import { ApplicationState } from "../reducer";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { pushSection } from "../router";

const chapters: ChapterModel[] = [
  {
    id: 1,
    name: "Introduction",
    sections: [
      { id: 1, name: "Welcome!", path: Paths.CHAPTER_01_SECTION_01 },
      {
        id: 2,
        name: "Representing numbers in binary",
        path: Paths.CHAPTER_01_SECTION_02
      },
      {
        id: 3,
        name: "Integer Representations",
        path: Paths.CHAPTER_01_SECTION_03
      }
    ]
  },
  {
    id: 2,
    name: "The Floating Point Binary Format",
    sections: [
      { id: 1, name: "The Sign Bit", path: Paths.CHAPTER_02_SECTION_01 },
      {
        id: 2,
        name: "The Exponent Bits",
        path: Paths.CHAPTER_02_SECTION_02
      },
      {
        id: 3,
        name: "The Mantissa Bits",
        path: Paths.CHAPTER_02_SECTION_03
      }
    ]
  }
];

interface TableOfContentsComponent {
  propTypes?: PropTypes.ValidationMap<TableOfContentsProperties>;

  (props: TableOfContentsProperties): React.ReactElement<
    TableOfContentsTypedProperties
  >;
}

interface TableOfContentsProperties extends JSX.IntrinsicAttributes {
  readonly currentChapter: any;
  readonly currentSection: any;
  readonly doSectionChange: any;
}

interface TableOfContentsTypedProperties extends TableOfContentsProperties {
  readonly currentChapter: number;
  readonly currentSection: number;
  readonly doSectionChange: (chapter: number, section: number) => any;
}

const TableOfContentsPropertyDefinition: PropTypes.ValidationMap<
  TableOfContentsProperties
> = {
  currentChapter: PropTypes.number.isRequired,
  currentSection: PropTypes.number.isRequired,
  doSectionChange: PropTypes.func.isRequired
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

function onLinkClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  props: TableOfContentsTypedProperties,
  chapter: number,
  section: number
) {
  e.preventDefault();
  props.doSectionChange(chapter, section);
}

export const TableOfContents: TableOfContentsComponent = (
  props: TableOfContentsProperties
) => (
  <nav className={css(styles.root)}>
    <ul className={css(styles.chapterList)}>
      {chapters.map((chapter, index) => (
        <li key={index} className={css(styles.root)}>
          <header className={css(styles.chapterName)}>{chapter.name}</header>
          <ul className={css(styles.sectionList)}>
            {chapter.sections.map(section => {
              return (
                <li key={section.id} className={css(styles.sectionListItem)}>
                  <a
                    href={section.path}
                    className={css(styles.sectionLink)}
                    onClick={e => onLinkClick(e, props, chapter.id, section.id)}
                  >
                    {section.name}
                  </a>
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

const mapStateToProps = (state: ApplicationState) => ({
  currentChapter: state.selectedChapter,
  currentSection: state.selectedSection
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  doSectionChange: (chapter: number, section: number) =>
    dispatch(pushSection(chapter, section))
});

export const TableOfContentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableOfContents);
