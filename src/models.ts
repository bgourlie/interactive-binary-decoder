import { ApplicationPath } from "./paths";

export interface ChapterModel {
  readonly id: number;
  readonly name: string;
  readonly sections: SectionModel[];
}

export interface SectionModel {
  readonly id: number;
  readonly name: string;
  readonly path: ApplicationPath;
}
