(function() {
    'use strict';

   angular
        .module('app')
        .factory('localStorageFactory', localStorageFactory);

   localStorageFactory.$inject = ['localStorageService'];

   /* @ngInject */
    function localStorageFactory(localStorageService) {
        var service = {
            setLocalStorage: setLocalStorage,
            getLocalStorage: getLocalStorage,
            logout: logout
        };
        return service;

       ////////////////

       function setLocalStorage(key, value) {
            return localStorageService.set(key, value);
        }

       function getLocalStorage(key) {
            return localStorageService.get(key);

       }

       function logout() {
            console.log(getLocalStorage('userId'));
            localStorageService.clearAll();
            console.log(getLocalStorage('userId'));
        }
    }
})();