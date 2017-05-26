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
        },
        {
          code: 7,
          description: 'Unknown device or device in an invalid state'
        },
        {
          code: 8,
          description: 'Owner does not have access to device or is unable to grant access to the device'
        },
        {
          code: 9,
          description: 'Owner can not manage access to device'
        },
        {
          code: 10,
          description: 'New owner already has access to device'
        },
        {
          code: 11,
          description: 'Owner OTP code is invalid or has expired'
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
