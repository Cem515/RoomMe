(function(){
    'use strict';

   angular
        .module('app')
        .factory('UserFactory', UserFactory)

   UserFactory.$inject = ['$http', 'localApi'];

   function UserFactory($http, localApi) {
        var service = {
            postRegistration: postRegistration,
            findUsers: findUsers
        };

       return service;

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

       function getUser(id) {
            return $http({
                method: 'GET',
                url: localApi + 'Users/UserSearch' + id,
                params: id
            }).then (function(response){
                return response.data[0];
            }, function (error){
                return error;
            })

        }

        function findUsers(login) {
            return $http({
                method: 'GET',
                url: localApi +'Users/UserSearch',
                params: login
            }).then (function(rerun){
                return rerun.data[0];
            }, function (error){
                return error;
            })

        }
    }
})();