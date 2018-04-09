import * as React from "react";
import * as Paths from "./paths";
import ChapterLink from "./ChapterLink";

export default class TableOfContents extends React.Component {
  render(): React.ReactNode {
    return (
      <nav id="table-of-contents">
        <ul>
          <li>
            <header className="chapter-name">Introduction</header>
            <ul>
              <li>
                <ChapterLink to={Paths.CHAPTER_01_SECTION_01}>
                  Welcome!
                </ChapterLink>
              </li>
              <li>
                <ChapterLink to={Paths.CHAPTER_01_SECTION_02}>
                  Representing numbers in binary
                </ChapterLink>
              </li>
              <li>
                <ChapterLink to={Paths.CHAPTER_01_SECTION_03}>
                  Integer Representations
                </ChapterLink>
              </li>
            </ul>
          </li>
          <li>
            <header className="chapter-name">
              The Floating Point Binary Format
            </header>
            <ul>
              <li>
                <ChapterLink to={Paths.CHAPTER_02_SECTION_01}>
                  The Sign Bit
                </ChapterLink>
              </li>
              <li>
                <ChapterLink to={Paths.CHAPTER_02_SECTION_02}>
                  The Exponent Bits
                </ChapterLink>
              </li>
              <li>
                <ChapterLink to={Paths.CHAPTER_02_SECTION_03}>
                  The Mantissa Bits
                </ChapterLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}
