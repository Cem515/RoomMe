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
            sendMsg: sendMsg
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
                return cons;
            }, function (error) {
                return error;
            })

        }

        function startCon(keys) {
            return $http({
                Method: 'Post',
                url: localApi + 'Conversations',
                data: keys,
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(function (sation) {
                return sation;
            }, function (error) {
                return error;
            })

        }


        function sendMsg(mso) {
            return $http({
                Method: 'Post',
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