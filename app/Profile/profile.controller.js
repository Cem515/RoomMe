(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$state'];
    function ProfileController($state) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();