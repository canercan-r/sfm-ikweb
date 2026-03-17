import { ASKERLIK_DURUM } from "./enums";

export interface IMekan {
  mekanID: number;
  mekanAdi: string;
}

export interface IDepartman {
  departmanID: number;
  departmanAdi: string;
  mekanID: number;
}

export interface IGorevTanim {
  gorevTanimID: number;
  gorevTanimAdi: string;
  departmanID: number;
  mekanID: number;
}

export interface IDil {
  dilID: number;
  dil: string;
}

export interface IEgitimDurum {
  egitimDurumID: number;
  egitimDurumu: string;
}

export interface IUyruk {
  uyrukID: number;
  uyruk: string;
}




export interface IEhliyet {
  ehliyetSinifID: number;
  ehliyetSinifi: string;
}

export interface IAskerlikDurum {
  askerlikDurumID: ASKERLIK_DURUM;
  askerlikDurumu: string;
}

export interface IDilSeviyesi {
  seviyeLangKey: string;
  seviye: string;
}

export interface IBrandingDatasFilter {
  sourceCode: string;
}

export interface IBrandingDatas {
  baslik: string;
  girisMetni: string;
  renkKodu: string;
  logoBase64: string;
  panelBase64: string;
  kvkkMetniEN: string;
  kvkkMetniTR: string;
  primary_active: string;
  primary_light: string;
  primary_light_dark: string;
  primary_light_active: string;
  primary_inverse: string;
}

export interface IKVKK {
  kvkkMetniEN: string;
  kvkkMetniTR: string;

}


export interface IFormDataFilter {
  sourceCode: string;
}

export interface IFormDatas {
  mekanlar: IMekan[];
  departmanlar: IDepartman[];
  gorevTanimlari: IGorevTanim[];
  diller: IDil[];
  egitimDurumlari: IEgitimDurum[];
  uyruklar: IUyruk[];
  maxFileSize: number;
}

export interface IRegisterFormData {
  ad: string;
  soyad: string;
  idNo: string;
  telefon: string;
  mekanID: number;
  departmanID: number;
  gorevTanimID: number;
  calismaTercihi: number;
  source: string;
}

export interface IGenelFormData {
  cinsiyetID: number;
  dogumTarihi: Date | string;
  uyrukID: number;
  eposta: string;
}

export interface IYetkinlikFormData {
  ehliyetiVar: boolean;//
  ehliyetSinifi: string;

  askerlikDurumID: number;
  engeliVar: boolean;//
  engelDurumu: string;
  ozgecmis: string;
  cvFile: string;
}


export interface ICandidateLangs {
  dilSeviyesi: string;
  dilID: number;
}

export interface IJobApplicationsFormData {
  ad: string;
  soyad: string;
  idNo: string;
  telefon: string;
  mekanID: number;
  departmanID: number;
  gorevTanimID: number;
  calismaTercihi: number;

  cinsiyetID: number;
  eposta: string;
  dogumTarihi: Date | string;

  egitimDurumID: number;
  diller: ICandidateLangs[];


  ehliyetiVar: boolean;//
  ehliyetSinifi: string;
  askerlikDurumID: number;
  engeliVar: boolean;//
  engelDurumu: string;
  ozgecmis: string;
  cvFile: string;

  dosyaAdi: string;
  dosyaBoyutu: number;
  dosyaTipi: string;
  cvContent: string;

}

