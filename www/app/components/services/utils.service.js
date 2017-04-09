(function() {
    'use strict';

    angular
        .module('vpsapp.services')
        .factory('Utils', Utils);

    Utils.$inject = [];

    function Utils() {

      var service = {};

      service.getVPSSignature = function(oid, token, apikey) {
        var message = oid + ":" + token + ":" + apikey;
        return sha256(message);
      }

      return service;
    }
})();
