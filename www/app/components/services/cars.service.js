(function() {
    'use strict';

    angular
        .module('vpsapp.services')
        .factory('Cars', Cars);

    Cars.$inject = [];

    function Cars() {
      var service = {};

      service.cars = [
        {
          id: 1,
          image: 'img/car-bmw.png',
          registration: 'BMW 1234567890',
          isMine: true
        },
        {
          id: 2,
          image: 'img/car-chevrolet.png',
          registration: 'CHEVROLET 1234567890',
          isMine: true
        },
        {
          id: 3,
          image: 'img/car-ford.png',
          registration: 'FORD 1234567890',
          isMine: true
        },
        {
          id: 11,
          image: 'img/car-gmc.png',
          registration: 'GMC 1234567890',
          isMine: false
        },
        {
          id: 12,
          image: 'img/car-toyota.png',
          registration: 'TOYOTA 1234567890',
          isMine: false
        }
      ];

      service.getCars = function() {
        return service.cars;
      }

      service.getCar = function(id) {
        for(var i=0; i < service.cars.length; i++) {
          if (service.cars[i].id == id) {
            return service.cars[i];
          }
        }

        return null;
      }

      return service;
    }
})();
