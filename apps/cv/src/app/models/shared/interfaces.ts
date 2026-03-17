

export interface IListMenu {
  color: string;
  page?: string;
  icon: string;
  title: string;
}

export interface IPagination {
  length: number;
  size: number;
  page: number;
  lastPage: number;
  startIndex: number;
  endIndex: number;
}

export interface OnAppInit {
  ngOnAppInit: () => void;
}

export interface ISearchResult {
  icon?: string;
  image?: string;
  title: string;
  description: string;
}
