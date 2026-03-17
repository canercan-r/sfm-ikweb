export interface IMenuData {
  headerMenu: IMenu[];
  asideMenu: IMenu[];
}

export interface IMenu extends IMenuSub {
  category?: string;
  icon?: string;
  badge?: string;
}

export interface IMenuSub {
  id: number;
  title: string;
  link: string;
  submenu?: IMenuSub[];
  indention?: boolean;
  starred?: boolean;
}
