(function() {
    'use strict';

    angular
        .module('vpsapp.services')
        .factory('Error', Error);

    Error.$inject = [];

    function Error() {

      var service = {};

      service.errors = [
        {
          code: 1,
          description: 'Owner could not be registered as email address already exists'
        },
        {
          code: 2,
          description: 'Invalid owner credentials'
        },
        {
          code: 3,
          description: 'Owner is locked due to too many invalid login attempts'
        },
        {
          code: 4,
          description: 'Owner is disabled'
        },
        {
          code: 5,
          description: 'Owner pin could not be changed as current pin is invalid'
        },
        {
          code: 6,
          description: 'Owner password could not be changed as current password is invalid'
        }
      ];

      service.getDescription = function(code) {
        for(var i=0; i < service.errors.length; i++) {
          if (service.errors[i].code == code) {
            return service.errors[i].description;
          }
        }

        return '';
      }

      return service;
    }
})();
