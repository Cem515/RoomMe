(function(){
    'use strict';

   angular
        .module('app')
        .controller('SignInController', SignInController)

   SignInController.$inject = ['$state', '$rootScope'];

   function SignInController($state, $rootScope) {

       var SignInCtrl = this; // Not using VM
        SignInCtrl.userDetails = {};
        SignInCtrl.userDetails.name = "";
        SignInCtrl.userDetails.email = "";
        SignInCtrl.userDetails.imageUrl = "";

       $rootScope.$on('event:social-sign-in-success', function(event, userDetails) {


       });


   }

})();