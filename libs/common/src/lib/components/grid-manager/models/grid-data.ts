import { GridColumn, IGridColumn, IGridColumnExt } from './grid-column.model';
import { GridPage, IGridPage } from './grid-page.model';

interface IPageCache {
  [key: string]: IGridPage;
}

interface IGridDetail {
  Level: number;
  Page: IGridPage;
  Columns: (IGridColumn | IGridColumnExt)[];
}

export interface IGridData {
  Page: IGridPage;
  TotalCount: number;

  DetailLevels: IGridDetail[];

  // --- Added For hierarchical grid trick
  FirstLevel: IGridDetail;
  SecondLevel: IGridDetail;
  // ---

  addDetailToLevelForKey(detail: any[], level: number, parentKey: string): void;
  cachePage(receivedPage: IGridPage): void;
  getPage(pageNumber: string | number): IGridPage;
  purgePageCache(): void;
  getPageInLevel(level: number, levelKey?: string): IGridPage;
  setupRootColumns(): IGridColumn[];
}

export class GridData implements IGridData {
  public Page: IGridPage;
  public TotalCount: number;
  public DetailLevels: IGridDetail[];

  // *** Added For hierarchical grid trick
  public FirstLevel: IGridDetail;
  public SecondLevel: IGridDetail;
  // ***

  private _PagesCache: IPageCache = {};

  constructor(gridPage: any[], totalCount: number) {
    this.TotalCount = totalCount;
    this.Page = new GridPage(gridPage, 1);
    this.DetailLevels = [] as IGridDetail[];
  }

  public addDetailToLevelForKey(detail: any[], level: number, masterPK: string): void {
    const masterPage = this.getPageInLevel(level);
    masterPage.PrimaryKey = masterPK;

    const detailPage = new GridPage(detail, 1);
    const newLevel = this.setupLevelForPage(level + 1, detailPage);

    this.DetailLevels.push(newLevel);

    // --- Added For hierarchical grid trick
    if (level === 0) {
      this.FirstLevel = newLevel;
    } else if (level === 1) {
      this.SecondLevel = newLevel;
    }
    // ---
  }

  public cachePage(receivedPage: IGridPage) {
    const receivedPageNo = receivedPage.PageNumber;
    this._PagesCache[receivedPageNo] = receivedPage;
  }

  public purgePageCache() {
    this._PagesCache = {};
  }

  public getPage(pageNumber: string | number): IGridPage {
    return this._PagesCache[pageNumber];
  }

  setupPageColumns(page: IGridPage): IGridColumn[] {
    const columns = [] as IGridColumn[];
    if (page && page.PageContent.length > 0) {
      const _gridColums = page.PageContent[0];

      if (_gridColums && _gridColums) {
        Object.entries(_gridColums).forEach(([key, value]) => {
          columns.push(new GridColumn(key, value));
        });
      }
    }
    return columns;
  }

  setupRootColumns(): IGridColumn[] {
    const columns = [] as IGridColumn[];
    if (this.Page && this.Page.PageContent.length > 0) {
      const _gridColums = this.Page.PageContent[0];

      if (_gridColums && _gridColums) {
        Object.entries(_gridColums).forEach(([key, value]) => {
          columns.push(new GridColumn(key, value));
        });
      }
    }
    return columns;
  }

  setupLevelForPage(level: number, page: IGridPage): IGridDetail {
    const gridLevelCols: IGridDetail = {
      Level: level,
      Page: page,
      Columns: this.setupPageColumns(page),
    };

    return gridLevelCols;
  }

  public addCustomColumnToChildLevel(extraCol: IGridColumnExt | IGridColumnExt[], childLevel: number): void {
    const theChild = this.getDetailLevel(childLevel);
    if (theChild) {
      if (extraCol instanceof Array) {
        extraCol.forEach((ext) => {
          const colToExtra = theChild.Columns.find((col) => col.field === ext.field);
          if (colToExtra) {
            colToExtra.colRef = ext.colRef;
          } else {
            if (ext.append) {
              theChild.Columns.push(ext);
            } else {
              theChild.Columns.unshift(ext);
            }
          }
        });
      } else {
        if (extraCol.append) {
          theChild.Columns.push(extraCol);
        } else {
          theChild.Columns.unshift(extraCol);
        }
      }
    }
  }

  public getPageInLevel(level: number, levelKey = 'default'): IGridPage {
    if (level === 0) {
      return this.Page;
    }

    const theLevel = this.DetailLevels.find((lev) => lev.Level === level);
    return theLevel.Page;
  }

  public getDetailLevel(level: number, levelKey = 'default'): IGridDetail {
    if (level === 0) {
      throw new Error('root is not a detail level');
    }

    return this.DetailLevels.find((lev) => lev.Level === level);
  }
}
