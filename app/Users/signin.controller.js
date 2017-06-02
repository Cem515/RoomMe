(function () {
    'use strict';

    angular
        .module('app')
        .controller('SignInController', SignInController)

    SignInController.$inject = ['$state', '$rootScope', 'socialLoginService', 'userFactory'];

    function SignInController($state, $rootScope) {

        var SignInCtrl = this; // Not using SignInCtrl
        //facebook details
        SignInCtrl.userDetails = {};
        SignInCtrl.userDetails.name = "";
        SignInCtrl.userDetails.Email = "";

        // Regular Register no Facebook
        SignInCtrl.nameObject = {};
        SignInCtrl.nameObject.UserName = "";
        SignInCtrl.nameObject.Password = "";
        SignInCtrl.nameObject.Email = "";
        SignInCtrl.nameObject.Landlord = false;
        SignInCtrl.nameObject.ZipCode = 0;
        SignInCtrl.nameObject.Phone = "";
        SignInCtrl.Registration= true;
        SignInCtrl.sObject.username='';
        SignInCtrl.sObject.password='';

        // SignInCtrl.signout = function () {socialLoginService.logout();}


        SignInCtrl.register = function (nameObject) {
            console.log(nameObject);
            UserFactory
                .postRegistration(nameObject)
                .then(function (info) {
                    console.log(info);
                }, function (error) {
                    console.log(error);

                })

            // What happens after succesful log in
            $rootScope.$on('event:social-sign-in-success', function (event, userDetails) {
                console.log(userDetails);


            });
        }

        SignInCtrl.signIn = function(log) {
            UserFactory
            .findUsers(log) 
            .then(function (signin){
                console.log(info);
            }, function (error) {
                console.log(error);
            })


        }
    }

})();