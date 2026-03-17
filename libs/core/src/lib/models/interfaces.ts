import { HttpHeaders } from "@angular/common/http";
import { EUserType, IGridConfig } from "@lib-common";

export interface IUser {
  userID: number;
  userName: string;
  fullName: string;
  firstName: string;
  lastName: string;
  image: string;
  phone: string;
  accessToken: string;
  language: string;
  job: string;
  ikPersonalID: number;
  pdPersonalID: number;
  projectID: number;
  instituteID: number;
  mobileDeviceTypeID: number;
  mobileDeviceToken: string;
  identityNo: string;
  pdksid: number;
  departman: string;
  mesaiStartType: number;
  checkOtp: boolean;
  forceToChangePass: boolean;
  kullaniciGridSettings: IGridConfig[];
  allowAnonymousRequests: boolean;
  mesaiIslemleriSaatleriGizle: boolean;

  // mockdata
  password: string;
  currencyISO: string;
  email: string;
  refreshToken: string;
  userTypeID: EUserType;
  occupation: string;
  companyName: string;
}

export interface IResponseWrapper<T> {
  hasError: boolean;
  errors: string[];
  response: T;
}

export interface IApiBaseConfig {
  ServerWithApiURL: string;
  ApiPrefix: string;
  Server: string;
  HubServer: string;
  [key: string]: string;
  OtelServerWithApiURL: string;
  OtelServer: string;
  BrandName?: string;
  ProjectName?: string;
  ThemeVersion?: string;
  AppVersion?: string;
  AppName?: string;
}

export type Headers = HttpHeaders | { [header: string]: string | string[] };

export interface IHttpOptions {
  loading: boolean;
}

export interface StatusModel {
  result: boolean;
  resultMessage: string;
  id: string;
}

export interface IApiResponse {
  success: boolean;
  errorExplanation: string;
  transactonID: number;
}

export interface IBaseSaveResponse {
  state: boolean;
  message: string;
}
