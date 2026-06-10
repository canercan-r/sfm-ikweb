export interface IApexArea {
  name: string;
  data: any[];
}

export interface IApexColumn {
  name: string;
  data: any[];
}

export interface IApexBar {
  name: string;
  data: any[];
}

export interface IApexMixed {
  name: string;
  type?: string;
  stacked?: boolean;
  data: any[];
}

export interface IApexPie {
  name: string;
  data: any[];
}
