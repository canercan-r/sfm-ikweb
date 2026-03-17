import { environment } from "@cv-env/environment";

export const ApiConfiguration = {
  Server: environment.apiServerURL,
  ApiPrefix: environment.apiPrefix,
  ServerWithApiURL: `${environment.apiServerURL}${environment.apiPrefix}`,

  JobURL: 'AdayGirisi/Register/',

  SharedURL: 'Shared/',
  ProjectName: 'cv',
  ThemeVersion: 'v4.5.3'
};
