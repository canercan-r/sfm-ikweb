export const environment = {
  production: false,

  // localhost
  // apiPrefix: 'api/',
  // apiServerUrl: 'http://10.215.0.159:5000/',
  // apiServerUrl: 'http://0.0.0.0:5000/',
  // hubServerUrl: 'http://localhost:5000/Hub',

  // dev
  apiPrefix: 'api/',
  apiServerUrl: '{{apiServerUrl}}',

  defaultLanguage: 'trTR',
  supportedLanguages: ['trTR', 'enUS'],
  isLogoSvgOrNot: false,
  isMockEnabled: false,
  version: '{{version}}', //YilAy.Gun.Saat
  appName: '{{appName}}',
  theme: '{{theme}}',
  brandName: '{{brandName}}',
};
