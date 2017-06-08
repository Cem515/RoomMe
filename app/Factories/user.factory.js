(function(){
    'use strict';

   angular
        .module('app')
        .factory('UserFactory', UserFactory)

   UserFactory.$inject = ['$http', 'localApi'];

   function UserFactory($http, localApi) {
        var service = {
            postRegistration: postRegistration,
            findUsers: findUsers,
             getUser: getUser,
            updateInfo: updateInfo

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

       //  function getUser(UserId) {
        //     return $http({
        //         method: 'GET',
        //         url: localApi + '/users' + UserId,

       //     }).then(function (response){
        //         console.log(response);

       //         if (typeof response.data !== null) {

       //             return response;
        //         } else {

       //             return 'no data!';
        //         }
        //     }, function (error) {
        //         return error;
        //     })
        //  }

        function getUser(id) {

            return $http({
                 method: 'GET',
                url: localApi + 'Users/' + id,
                params: id
            }).then (function(response){
                return response.data;
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

        function updateInfo(id, edit) {
            return $http({
                method: 'PUT',
                url: localApi + 'Users/' + id,
                headers: {'Content-Type': 'application/json'},
                data: edit
            }).then(function(response){
                console.log(response);
            }, function(error) {
                console.log(error);
            });
        }
    }
})();