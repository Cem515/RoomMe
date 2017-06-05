(function(){
    'use strict';

    angular
        .module('app')
<<<<<<< HEAD
        .factory('MessagesFactory', MessagesFactory)

    MessagesFactory.$inject = ['$http', 'localApi'];

    function MessagesFactory($http, localApi) {
        var service = {
            getRecd: getRecd
=======
        .factory('UserFactory', UserFactory)

    UserFactory.$inject = ['$http', 'localApi'];

    function UserFactory($http, localApi) {
        var service = {
            postRegistration: postRegistration,
            findUsers: findUsers
>>>>>>> listings
        };

        return service;

<<<<<<< HEAD
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
=======
        function postRegistration(registration) {

            return $http({
                method: 'POST',
                url: localApi + '/users',
                dataType: "json",
                data: registration,
                headers: {
                    'content-Type': 'application/json; charset=utf-8'
                }
            }).then(function (info){
                return info;
            }, function (error) {
                return error;
            })

         }

         function findUsers(login) {
            return $http({
                method: 'GET',
                url: localApi +'Users/UserSearch',
                params: login
            }).then (function(rerun){
                return rerun;
            }, function (error){
                return error;
            })

>>>>>>> listings
         }
    }
})();