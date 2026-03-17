export interface OnAppInit {
  ngOnAppInit: () => void;
}

export interface ICountry {
  countryID: number;
  countryName: string;
  langCode: string;
  phoneMask: string;
}
