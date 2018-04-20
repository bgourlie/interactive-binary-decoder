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
  chapterListItem: {
    fontWeight: "bold",
    margin: "0 0 0.5em 0"
  },
  selectedChapterListItem: {
    textDecoration: "underline"
  },
  sectionList: {
    fontSize: "1rem",
    margin: "0 0 0 0.5rem",
    padding: "0",
    listStyleType: "none"
  },
  sectionListItem: {
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

const chapterListItemClass = (isActive: boolean) => {
  return css(
    styles.chapterListItem,
    isActive && styles.selectedChapterListItem
  );
};

const sectionListItemClass = (isActive: boolean) => {
  return css(
    styles.sectionListItem,
    isActive && styles.selectedSectionListItem
  );
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
  props: TableOfContentsProperties
) => (
  <nav className={css(styles.root)}>
    <ul className={css(styles.chapterList)}>
      {chapters.map((chapter, index) => {
        const isCurrentChapter = props.currentChapter === chapter.id;
        return (
          <li key={index} className={css(styles.root)}>
            <header className={chapterListItemClass(isCurrentChapter)}>
              {chapter.name}
            </header>
            <ul className={css(styles.sectionList)}>
              {chapter.sections.map(section => {
                const isCurrentSection =
                  isCurrentChapter && props.currentSection === section.id;
                return (
                  <li
                    key={section.id}
                    className={sectionListItemClass(isCurrentSection)}
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
