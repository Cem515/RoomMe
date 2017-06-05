(function(){
    'use strict';

    angular
        .module('app')
        .factory('MessagesFactory', MessagesFactory)

    MessagesFactory.$inject = ['$http', 'localApi'];

    function MessagesFactory($http, localApi) {
        var service = {
            getRecd: getRecd
        };

        return service;

        function getRecd(name) {

            return $http ({
                Method:'GET',
                url: localApi+'Users/UserIDSearch',
                data: name
            }).then (function(response) {
                return response;
            }), function (error) {
                return error;
            }
         }
    }
})();