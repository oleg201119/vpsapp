(function() {
    'use strict';

    angular
        .module('vpsapp.services')
        .factory('Questions', Questions);

    Questions.$inject = [];

    function Questions() {
      var service = {};

      service.data = [{
        query: "What was your childhood nickname?",
        code: "1"
      }, {
        query: "What is your favorite movie?",
        code: "2"
      }, {
        query: "What was your favorite sport in high school?",
        code: "3"
      }, {
        query: "What was the make and model of your first car?",
        code: "4"
      }, {
        query: "Who is your childhood sports hero?",
        code: "5"
      }];

      return service;
    }
})();
