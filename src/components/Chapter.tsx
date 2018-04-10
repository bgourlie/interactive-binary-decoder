import * as React from "react";
import * as PropTypes from "prop-types";
import "react";
import { ChapterModel } from "../models";
import { NavLink } from "react-router-dom";
import { StyleSheet, css } from "aphrodite/no-important";

interface ChapterBaseProperties {
  readonly chapter: any;
}

interface ChapterProperties
  extends ChapterBaseProperties,
    JSX.IntrinsicAttributes {
  readonly chapter: ChapterModel;
}

const SectionModelValidator = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};

const ChapterModelValidator = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape(SectionModelValidator))
};

const ChapterComponentPropertyDefinition: PropTypes.ValidationMap<
  ChapterBaseProperties
> = {
  chapter: PropTypes.shape(ChapterModelValidator)
};

interface ChapterComponent {
  propTypes?: PropTypes.ValidationMap<ChapterProperties>;
  (props: ChapterProperties): React.ReactElement<ChapterProperties>;
}

const styles = StyleSheet.create({
  root: {
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
    color: "#aaa"
  },
  sectionActive: {
    color: "black"
  }
});

const Chapter: ChapterComponent = (props: ChapterProperties) => (
  <li className={css(styles.root)}>
    <header className={css(styles.chapterName)}>{props.chapter.name}</header>
    <ul className={css(styles.sectionList)}>
      {props.chapter.sections.map(section => {
        return (
          <li className={css(styles.sectionListItem)} key={section.id}>
            <NavLink
              activeClassName={css(styles.sectionActive)}
              exact
              to={section.path}
            >
              {section.name}
            </NavLink>
          </li>
        );
      })}
    </ul>
  </li>
);

Chapter.propTypes = ChapterComponentPropertyDefinition;

export default Chapter;
