import * as React from "react";
import * as PropTypes from "prop-types";
import "react";
import { ChapterModel } from "../models";
import { css, StyleSheet } from "../styles";

interface ChapterBaseProperties {
  readonly chapter: any;
}

interface ChapterProperties
  extends ChapterBaseProperties,
    JSX.IntrinsicAttributes {
  readonly chapter: ChapterModel;
}

const SectionPropertiesValidator = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};

const ChapterPropertiesValidator = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape(SectionPropertiesValidator)).isRequired
};

const ChapterComponentPropertyDefinition: PropTypes.ValidationMap<
  ChapterBaseProperties
> = {
  chapter: PropTypes.shape(ChapterPropertiesValidator).isRequired
};

interface ChapterComponent {
  propTypes?: PropTypes.ValidationMap<ChapterProperties>;
  (props: ChapterProperties): React.ReactElement<ChapterProperties>;
}

const chapterStyles = StyleSheet.create({
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

const Chapter: ChapterComponent = (props: ChapterProperties) => (
  <li className={css(chapterStyles.root)}>
    <header className={css(chapterStyles.chapterName)}>{props.chapter.name}</header>
    <ul className={css(chapterStyles.sectionList)}>
      {props.chapter.sections.map(section => {
        return (
          <li className={css(chapterStyles.sectionListItem)} key={section.id}>
            <a className={css(chapterStyles.sectionLink)}>{section.name}</a>
          </li>
        );
      })}
    </ul>
  </li>
);

Chapter.propTypes = ChapterComponentPropertyDefinition;

export default Chapter;
