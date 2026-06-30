import { environment } from '@ikweb-env/environment';

export const ApiConfiguration = {
  Server: environment.apiServerUrl,
  ApiPrefix: environment.apiPrefix,
  ServerWithApiURL: `${environment.apiServerUrl}${environment.apiPrefix}`,

  BrandName: `${environment.brandName}`,
  AppName: `${environment.appName}`,
  ThemeVersion: 'v8.5.8',
  ProjectName: 'ikweb',
  UseBrandTranslationLoader: true,

  AuthURL: 'Authenticate/Auth',

  HomeURL: 'Home/',
  SharedURL: 'Shared_',
  InsanKaynaklariURL: 'InsanKaynaklari_',
  PuantajURL: 'Puantaj_',
  TedarikURL: 'Tedarik_'
};
