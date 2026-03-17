export interface IMenuData {
  headerMenu: IMenu[];
  asideMenu: IMenu[];
}

export interface IMenu extends IMenuSub {
  category?: string;
  badge?: string;
  starred?: boolean;
  rootMenuID?: number;
}

export interface IMenuSub {
  id: number;
  title: string;
  link: string;
  icon?: string;
  submenu?: IMenuSub[];
  indention?: boolean;
  starred?: boolean;
  order?: number;
}
