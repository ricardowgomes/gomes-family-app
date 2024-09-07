interface BaseLabel {
  name: string;
}

export interface Label extends BaseLabel {
  id: string;
}

export type NewLabel = BaseLabel;

export interface LabelQueryParams {
  excludedIds?: string[];
  searchTerm?: string;
}
