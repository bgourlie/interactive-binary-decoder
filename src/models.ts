export interface SectionBaseProperties {
  readonly section: any;
}

export interface ChapterBaseProperties {
  readonly chapter: any;
}

export interface ChapterProperties
  extends ChapterBaseProperties,
    JSX.IntrinsicAttributes {
  readonly chapter: ChapterModel;
}

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
