import * as React from "react";
import * as PropTypes from "prop-types";
import { ValidationMap } from "prop-types";
import "react";
import { ChapterBaseProperties, ChapterProperties } from "../models";
import { NavLink } from "react-router-dom";

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

const ChapterComponentPropertyDefinition: ValidationMap<
  ChapterBaseProperties
> = {
  chapter: PropTypes.shape(ChapterModelValidator)
};

interface ChapterComponent {
  propTypes?: PropTypes.ValidationMap<ChapterProperties>;

  (props: ChapterProperties): React.ReactElement<ChapterProperties>;
}

const Chapter: ChapterComponent = (props: ChapterProperties) => (
  <li>
    <header className="chapter-name">{props.chapter.name}</header>
    <ul>
      {props.chapter.sections.map(section => {
        return (
          <li key={section.id}>
            <NavLink activeClassName="active" exact to={section.path}>
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
