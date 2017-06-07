(function () {
    'use strict';

    angular
        .module('app')
        .factory('MessagesFactory', MessagesFactory)

    MessagesFactory.$inject = ['$http', 'localApi'];

    function MessagesFactory($http, localApi) {
        var service = {
            getRecd: getRecd,
            converse: converse,
            startCon: startCon,
            sendMessage: sendMessage
        };

        return service;

        function getRecd(name) {

            return $http({
                Method: 'GET',
                url: localApi + 'Users/NameSearch?username=' + name
            }).then(function (response) {
                return response;
            }, function (error) {
                return error;
            })
        }

        function converse(number) {

            return $http({
                Method: 'GET',
                url: localApi + 'Conversations/ConvoSearch',
                params: number
            }).then(function (cons) {
                return cons.data;
            }, function (error) {
                return error;
            })

        }

        function startCon(keys) {

            return $http({
                Method: 'POST',
                url: localApi + 'Conversations',
                datatype: JSON,
                params: keys,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(function (sation) {
                return sation;
            }, function (error) {
                return error;
            })

        }


        function sendMessage(mso) {
            return $http({
                Method: 'POST',
                url: localApi + 'Messages',
                params: mso
            }).then(function (sage) {
                    return sage;
                }, function (error) {
                    return error;
                }

            )
        }

    }
})();