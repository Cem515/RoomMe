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
                url: localApi+'Users/UserSearch',
                data: name
            }).then (function(info) {
                return info;
            }), function (error) {
                return error;
            }
         }
    }
})();