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

      service.isJSON = function(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
      }

      service.decryptCert = function(cert, token, pin) {

        var key_iv = sha256(token + ":" + pin).toUpperCase();

        var iv  = CryptoJS.enc.Utf8.parse(key_iv.substr(0, 16));
        var key = CryptoJS.enc.Utf8.parse(key_iv.substr(16, 32));

        var decrypted = CryptoJS.AES.decrypt(cert, key, { iv: iv });
        var decrypted_str = '';
        var json_obj = null;

        try {
          decrypted_str = decrypted.toString(CryptoJS.enc.Utf8) + '';
          json_obj = JSON.parse(decrypted_str);
        } catch (e) {
          console.log(e);
          return false;
        }

        return json_obj;
      }

      return service;
    }
})();
