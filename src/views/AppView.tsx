import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RouteNotFound from "../components/RouteNotFound";
import TableOfContents from "../components/TableOfContents";
import * as Paths from "../paths";
import PageC01S01 from "../markdown/c01_s01.md";
import PageC01S02 from "../markdown/c01_s02.md";
import PageC01S03 from "../markdown/c01_s03.md";
import PageC02S01 from "../markdown/c02_s01.md";
import PageC02S02 from "../markdown/c02_s02.md";
import PageC02S03 from "../markdown/c02_s03.md";
import { ChapterModel } from "../models";
import { css, StyleSheet } from "../styles";

const chapters: ChapterModel[] = [
  {
    id: "c01",
    name: "Introduction",
    sections: [
      { id: "s01", name: "Welcome!", path: Paths.CHAPTER_01_SECTION_01 },
      {
        id: "s02",
        name: "Representing numbers in binary",
        path: Paths.CHAPTER_01_SECTION_02
      },
      {
        id: "s03",
        name: "Integer Representations",
        path: Paths.CHAPTER_01_SECTION_03
      }
    ]
  },
  {
    id: "c02",
    name: "The Floating Point Binary Format",
    sections: [
      { id: "s01", name: "The Sign Bit", path: Paths.CHAPTER_02_SECTION_01 },
      {
        id: "s02",
        name: "The Exponent Bits",
        path: Paths.CHAPTER_02_SECTION_02
      },
      {
        id: "s03",
        name: "The Mantissa Bits",
        path: Paths.CHAPTER_02_SECTION_03
      }
    ]
  }
];

const styles = StyleSheet.create({
  appContainerInner: {
    display: "flex",
    flexDirection: "column"
  },
  appHeader: {
    marginBottom: "3rem"
  },
  pageTitle: {
    fontSize: "1.5rem"
  },
  pageSubtitle: {
    marginLeft: "0.5rem"
  },
  appBody: {
    display: "flex",
    flex: "1"
  },
  pageContainer: {
    flex: "1",
    padding: "0 3rem"
  }
});

function AppView(): React.ReactElement<any> {
  return (
    <BrowserRouter>
      <section className={css(styles.appContainerInner)}>
        <header className={css(styles.appHeader)}>
          <span className={css(styles.pageTitle)}>What the float?</span>
          <span className={css(styles.pageSubtitle)}>
            An interactive guide to floating point numbers.
          </span>
        </header>
        <section className={css(styles.appBody)}>
          <TableOfContents chapters={chapters} />
          <section id="page" className={css(styles.pageContainer)}>
            <Switch>
              <Route
                exact
                path={Paths.CHAPTER_01_SECTION_01}
                component={PageC01S01}
              />
              <Route
                exact
                path={Paths.CHAPTER_01_SECTION_02}
                component={PageC01S02}
              />
              <Route
                exact
                path={Paths.CHAPTER_01_SECTION_03}
                component={PageC01S03}
              />

              <Route
                exact
                path={Paths.CHAPTER_02_SECTION_01}
                component={PageC02S01}
              />
              <Route
                exact
                path={Paths.CHAPTER_02_SECTION_02}
                component={PageC02S02}
              />
              <Route
                exact
                path={Paths.CHAPTER_02_SECTION_03}
                component={PageC02S03}
              />
              <Route component={RouteNotFound} />
            </Switch>
          </section>
        </section>
      </section>
    </BrowserRouter>
  );
}

export default AppView;
