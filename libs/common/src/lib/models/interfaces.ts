import { FIELD_TYPE } from "@ik-mobile-shared/models";
import { ColorType } from "./types";

export interface IReportPrint {
  printerName: string;
  reportName: string;
  reportParams: any;
  copy?: number;
}

export interface IAlert {
  type: AlertType;
  title: string;
  text: string;
  textTrusted: boolean;
  overlayClose: boolean;
  delay: number;
  position: string;
}

export type AlertType = 'success' | 'error' | 'info' | 'notice';

export abstract class AlertDisplayService {
  show: (message: IAlert) => void;
  removeAll: () => void;
}

export interface IConfirm {
  title?: string;
  message?: string;
  icon?: {
    show?: boolean;
    name?: string;
    color?: ColorType;
  };
  buttons?: {
    confirm?: {
      show?: boolean;
      label?: string;
      color?: ColorType;
    };
    cancel?: {
      show?: boolean;
      label?: string;
    };
  };
  dismissible?: boolean;
}

export interface IPagerTemplate {
  PageSize: number;
  PageNumber: number;
  WhereClauseExp: string;
  OrderByClauseExp: string;
}

export interface IPagination {
  length: number;
  size: number;
  page: number;
  lastPage: number;
  startIndex: number;
  endIndex: number;
}

export interface IFormAlanDTO {
  alanAdi: string;
  zorunluMu: boolean;
  formTuru: number;
  validationTuru: string;
}

export interface ICardReaderMessage {
  CardNumber: string;
  DeviceName: string;
}


export enum FileQueueStatus {
  pending,
  success,
  error,
  progress,
}

export interface IDropDown {
  valueKey: string | number;
  displayKey: string;
  groupKey?: string | number;
  filterKey?: string | number;
}

export type LangCode = 'tr-TR' | 'en-US' | 'deDe' | 'GRGR' | 'ALBALB' | 'ozel' | 'ruRU' | 'arSA' | 'roRO' | 'srSP';

export interface IAppLang {
  isoLangCode: string;
  langCode: LangCode;
}

export interface ICountry {
  countryID: number;
  countryName: string;
  langCode: string;
  phoneMask: string;
}

export interface RequiredInput {
  fieldType: FIELD_TYPE;
  inputName: string;
  zorunlu: boolean;
  sozlesmeZorunlu: boolean;
  values: string;
  inputStatic: boolean;
  parentKey: string;
  sira: number;
  tekillik: boolean;
}
