angular.module('vpsapp.config', [])
  .value(
    'Config', {
      // 'ENV': 'prod',
      // 'BASE_URL': 'http://vps.oliveinnovations.com/devrest/mobile/',

      'ENV': 'dev',
      'BASE_URL': 'http://localhost:8100/devrest/mobile/',

      'API_KEY': 'c41962df-6dcb-4b40-bb81-e5672762fc5d'
    }
  )
;
