import * as React from "react";
import * as Paths from "../paths";
import {ChapterModel} from "../models";
import * as PropTypes from "prop-types";
import {css, StyleSheet} from "../styles";
import {ApplicationState} from "../reducer";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {pushSection} from "../router";

const chapters: ChapterModel[] = [
  {
    id: 1,
    name: "Introduction",
    sections: [
      {id: 1, name: "Welcome!", path: Paths.CHAPTER_01_SECTION_01},
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
      {id: 1, name: "The Sign Bit", path: Paths.CHAPTER_02_SECTION_01},
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

  (props: TableOfContentsTypedProperties): React.ReactElement<TableOfContentsTypedProperties>;
}

interface TableOfContentsProperties extends JSX.IntrinsicAttributes {
  readonly currentChapter: any;
  readonly currentSection: any;
  readonly doSectionChange: any;
}

interface TableOfContentsTypedProperties extends TableOfContentsProperties {
  readonly currentChapter: number;
  readonly currentSection: number;
  readonly doSectionChange: (chapter: number, section: number) => void;
}

const styles = StyleSheet.create({
  tableOfContents: {
    display: "flex",
    flexDirection: "column",
    fontSize: "0.8rem"
  },
  chapters: {
    margin: "0",
    padding: "0 1rem 0 0",
    height: "100%",
    listStyleType: "none",
    borderRight: "1px solid #ccc"
  },
  chapter: {
    fontWeight: "bold",
    margin: "0 0 1.2rem 0",
    opacity: "0.5",
    transition: "opacity 100ms linear"
  },
  selectedChapter: {
    opacity: "1"
  },
  chapterHeader: {
    margin: "0 0 0.5rem 0",
    textDecoration: "underline"
  },
  sections: {
    margin: "0 0 0 0.5rem",
    padding: "0",
    listStyleType: "none"
  },
  section: {
    margin: "0 0 0.5rem 0",
    transition: "transform 100ms ease-out"
  },
  sectionLink: {
    textDecoration: "none"
  },
  selectedSectionListItem: {
    color: "black !important",
    transform: "translateX(0.5rem)"
  }
});

const chapterClass = (isActive: boolean) => {
  return css(styles.chapter, isActive && styles.selectedChapter);
};

const sectionClass = (isActive: boolean) => {
  return css(styles.section, isActive && styles.selectedSectionListItem);
};

function linkClickHandler(
  e: React.MouseEvent<HTMLAnchorElement>,
  props: TableOfContentsTypedProperties,
  chapter: number,
  section: number
) {
  e.preventDefault();
  props.doSectionChange(chapter, section);
}

export const TableOfContents: TableOfContentsComponent = (
  props: TableOfContentsTypedProperties
) => (
  <nav className={css(styles.tableOfContents)}>
    <ul className={css(styles.chapters)}>
      {chapters.map((chapter, index) => {
        const isCurrentChapter = props.currentChapter === chapter.id;
        return (
          <li key={index} className={chapterClass(isCurrentChapter)}>
            <header className={css(styles.chapterHeader)}>
              {chapter.name}
            </header>
            <ul className={css(styles.sections)}>
              {chapter.sections.map(section => {
                const isCurrentSection =
                  isCurrentChapter && props.currentSection === section.id;
                return (
                  <li
                    key={section.id}
                    className={sectionClass(isCurrentSection)}
                  >
                    <a
                      href={section.path}
                      className={css(styles.sectionLink)}
                      onClick={e =>
                        linkClickHandler(e, props, chapter.id, section.id)
                      }
                    >
                      {section.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  </nav>
);

TableOfContents.propTypes = {
  currentChapter: PropTypes.number.isRequired,
  currentSection: PropTypes.number.isRequired,
  doSectionChange: PropTypes.func.isRequired
};

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
