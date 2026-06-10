export enum ELogoTurleri {
  Logo = 0,
  LogoOnLight = 1,
  LogoOnDark = 2,
  LogoText = 3,
  LogoTextInverse = 4,
  LogoTextOnLight = 5,
  LogoTextOnDark = 6,
}

export enum EGuid {
  Empty = '00000000-0000-0000-0000-000000000000'
}


export enum EFormState {
  List,
  Modal
}

export enum EUserType {
  MANAGER = 0,
  ADMIN = 1,
  USER = 2
}

export enum EMenuType {
  URL = 1,
  MODAL = 2,
}

export enum ESearchType {
  OVERLAY = 1,
  MODAL = 2,
}

export enum ELangType {
  enUS = 0,
  trTR = 1,
  ruRU = 2
}

export enum CINSIYET_TURLERI {
  BELIRTILMEMIS = 0,
  ERKEK = 1,
  KADIN = 2
}

export enum DATE_STATUS {
  BUGUN = 1,
  DUN = 2,
  YARIN = 3,
  BU_HAFTA = 4,
  GECEN_HAFTA = 5,
  GELECEK_HAFTA = 6,
  BU_AY = 7,
  GECEN_AY = 8,
  GELECEK_AY = 9,
  BU_YIL = 10,
  GECEN_YIL = 11,
  GELECEK_YIL = 12,
}

export enum DATE_FILTER {
  BU = 1,
  GECEN = 2,
  GELECEK = 3,
  OZEL = 4,
}

export enum DATE_GROUP {
  GUN = 1,
  HAFTA = 2,
  AY = 3,
  YIL = 4,
}

export enum DATE_VIEW {
  GUNLUK = 1,
  HAFTALIK = 2,
  AYLIK = 3,
  YILLIK = 4
}

export enum DataStorageTypes {
  SQL,
  Redis,
}

export enum CAMERA_MODE {
  CAMERA = 'camera',
  PHOTO = 'photo',
}
