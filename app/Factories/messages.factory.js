(function () {
    'use strict';

    angular
        .module('app')
        .factory('MessagesFactory', MessagesFactory)

    MessagesFactory.$inject = ['$http', 'localApi'];

    function MessagesFactory($http, localApi) {
        var service = {
            getRecd: getRecd,
            converse: converse
        };

        return service;

        function getRecd(name) {

            return $http({
                Method: 'GET',
                url: localApi + 'Users/NameSearch?username='+name
            }).then(function (response) {
                return response;
            }, function (error) {
                return error;
            })
        }

        function converse(number) {

return $http ({
Method: 'GET',
url: localApi

})

        }


    }
})();