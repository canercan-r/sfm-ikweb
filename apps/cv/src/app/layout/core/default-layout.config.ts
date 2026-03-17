export interface ILayoutComponent {
  componentName: string;
}

export interface ILoader extends ILayoutComponent {
  display?: boolean;
  type: 'default' | 'spinner-message' | 'spinner-logo';
}

export interface IScrollTop extends ILayoutComponent {
  display: boolean;
}

export interface IHeader extends ILayoutComponent {
  display: boolean;
  width: 'fixed' | 'fluid';
  left: 'menu' | 'page-title';
  height: {
    desktop: string;
    tabletAndMobile: string;
  };
  fixed: {
    desktop: boolean;
    tabletAndMobile: boolean;
  };
  menuIcon: 'svg' | 'font';
  menuFavorite: boolean;
}

export interface IMegaMenu extends ILayoutComponent {
  display: boolean;
}

export interface IAside extends ILayoutComponent {
  display: boolean; // Display aside
  theme: 'dark' | 'light'; // Set aside theme(dark|light)
  menu: 'main' | 'documentation'; // Set aside menu(main|documentation)
  fixed: boolean; // Enable aside fixed mode
  minimized: boolean; // Set aside minimized by default
  minimize: boolean; // Allow aside minimize toggle
  logo: boolean; // Allow aside logo toggle
  hoverable: boolean; // Allow aside hovering when minimized
  menuIcon: 'svg' | 'font'; // Menu icon type(svg|font)
  menuFavorite: boolean;
}

export interface IContent extends ILayoutComponent {
  width: 'fixed' | 'fluid' | 'null';
  layout: 'default' | 'docs';
  spacing: {
    desktop: string;
    tabletAndMobile: string;
  };
}

export interface IFooter extends ILayoutComponent {
  display: boolean;
  width: 'fixed' | 'fluid';
}

export interface ISidebar extends ILayoutComponent {
  display: boolean;
  toggle: boolean;
  shown: boolean;
  content: 'general' | 'user' | 'shop';
  bgColor: 'bg-body' | 'bg-info';
  displayFooter: boolean;
  displayFooterButton: boolean;
}

export interface IToolbar extends ILayoutComponent {
  display: boolean;
  width: 'fixed' | 'fluid';
  fixed: {
    desktop: boolean; // Set fixed header for desktop
    tabletAndMobileMode: boolean; // Set fixed header for talet & mobile
  };
  layout: 'toolbar1' | 'toolbar2' | 'toolbar3' | 'toolbar4' | 'toolbar5';
  toolbarBg: boolean;
  layouts: {
    toolbar1: {
      height: string;
      heightAndTabletMobileMode: string;
    };
    toolbar2: {
      height: string;
      heightAndTabletMobileMode: string;
    };
    toolbar3: {
      height: string;
      heightAndTabletMobileMode: string;
    };
    toolbar4: {
      height: string;
      heightAndTabletMobileMode: string;
    };
    toolbar5: {
      height: string;
      heightAndTabletMobileMode: string;
    };
  };
}

export interface IPageTitle extends ILayoutComponent {
  display: boolean;
  breadCrumbs: boolean;
  description: boolean;
  layout: 'default' | 'select';
  direction: 'row' | 'column';
  responsive: boolean;
  responsiveBreakpoint: 'lg' | 'md' | 'lg' | '300px';
  responsiveTarget: string;
}

export interface IMain extends ILayoutComponent {
  body?: {
    backgroundImage?: string;
    class?: string;
  };
  primaryColor: string;
  darkSkinEnabled: boolean;
  type: 'blank' | 'default' | 'none';
  displayDensity: "comfortable" | "cosy" | "compact";
}

export interface ILayout {
  loader: ILoader;
  scrolltop: IScrollTop;
  header: IHeader;
  megaMenu: IMegaMenu;
  aside: IAside;
  content: IContent;
  toolbar: IToolbar;
  footer: IFooter;
  sidebar?: ISidebar;
  main?: IMain;
  pageTitle?: IPageTitle;
}

export interface ILayoutCSSClasses {
  header: Array<string>;
  headerContainer: Array<string>;
  headerMobile: Array<string>;
  headerMenu: Array<string>;
  aside: Array<string>;
  asideMenu: Array<string>;
  asideToggle: Array<string>;
  sidebar: Array<string>;
  toolbar: Array<string>;
  toolbarContainer: Array<string>;
  content: Array<string>;
  contentContainer: Array<string>;
  footerContainer: Array<string>;
  pageTitle: Array<string>;
}

export interface ILayoutHTMLAttributes {
  asideMenu: Map<string, string | number | boolean>;
  headerMobile: Map<string, string | number | boolean>;
  headerMenu: Map<string, string | number | boolean>;
  headerContainer: Map<string, string | number | boolean>;
  pageTitle: Map<string, string | number | boolean>;
}

export interface ILayoutCSSVariables {
  body: Map<string, string | number | boolean>;
}

export const DefaultLayoutConfig: ILayout = {
  main: {
    componentName: 'main',
    type: 'default',
    primaryColor: '#773dbd',
    darkSkinEnabled: false,
    displayDensity: 'comfortable' // ***The variables in the lib-grid.component.ts should change
  },
  loader: {
    componentName: 'loader',
    display: true,
    type: 'default', // Set default|spinner-message|spinner-logo to hide or show page loader
  },
  scrolltop: {
    componentName: 'scroll-top',
    display: true,
  },
  header: {
    componentName: 'header',
    display: true, // Set true|false to show or hide Header
    width: 'fluid', // Set fixed|fluid to change width type
    left: 'menu',
    height: {
      desktop: '45px', // ***The variables _variables.scss in the layout should change
      tabletAndMobile: '55px', // ***The variables _variables.scss in the layout should change
    },
    fixed: {
      desktop: true, // Set true|false to set fixed Header for desktop mode
      tabletAndMobile: true, // Set true|false to set fixed Header for tablet and mobile modes
    },
    menuIcon: 'font',
    menuFavorite: true,
  },
  megaMenu: {
    componentName: 'mega-menu',
    display: true, // Set true|false to show or hide Mega Menu
  },
  aside: {
    componentName: 'aside',
    display: true,
    theme: 'dark',
    menu: 'main',
    fixed: true,
    minimized: true,
    minimize: true,
    logo: false,
    hoverable: true,
    menuIcon: 'font',
    menuFavorite: false,
  },
  content: {
    componentName: 'content',
    width: 'fluid', // Set fixed|fluid to change width
    layout: 'default',
    spacing: {
      desktop: '24px', // Padding for desktop mode ***The variables _variables.scss in the layout should change
      tabletAndMobile: '16px', // Padding for tablet and mobile mode ***The variables _variables.scss in the layout should change
    },
  },
  toolbar: {
    componentName: 'toolbar',
    display: true, // Display toolbar
    width: 'fluid', // Set fixed|fluid to change width type,
    fixed: {
      desktop: true,
      tabletAndMobileMode: true,
    },
    layout: 'toolbar1',
    toolbarBg: true,
    layouts: {
      toolbar1: {
        height: '50px', // ***The variables _variables.scss in the layout should change
        heightAndTabletMobileMode: '50px', // ***The variables _variables.scss in the layout should change
      },
      toolbar2: {
        height: '75px',
        heightAndTabletMobileMode: '65px',
      },
      toolbar3: {
        height: '55px',
        heightAndTabletMobileMode: '55px',
      },
      toolbar4: {
        height: '65px',
        heightAndTabletMobileMode: '65px',
      },
      toolbar5: {
        height: '75px',
        heightAndTabletMobileMode: '65px',
      },
    },
  },
  footer: {
    display: false,
    componentName: 'footer',
    width: 'fluid', // Set fixed|fluid to change width type
  },
  pageTitle: {
    componentName: 'page-title',
    display: true,
    breadCrumbs: true,
    description: false,
    layout: 'default',
    direction: 'column',
    responsive: true,
    responsiveBreakpoint: 'lg',
    responsiveTarget: '#st_toolbar_container',
  },
};
