(function(){
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController)

    ProfileController.$inject = ['$location'];

    function ProfileController($location) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() { }
    }
})();