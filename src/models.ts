export interface ChapterModel {
  readonly id: string;
  readonly name: string;
  readonly sections: SectionModel[];
}

export interface SectionModel {
  readonly id: string;
  readonly name: string;
  readonly path: string;
}
