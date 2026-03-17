export interface IGridPage {
  PageContent: any[];
  PageNumber: number;

  PrimaryKey: string;
}

export class GridPage implements IGridPage {
  public PageContent: any[];
  public PageNumber: number;

  public PrimaryKey = 'not_set';

  constructor(pageContent: any[], pageNumber: number) {
    this.PageContent = pageContent;
    this.PageNumber = pageNumber;
  }

  public addDetailWithKey(detail: any[]): IGridPage {
    const detailPage = new GridPage(detail, 1);

    return detailPage;
  }
}
