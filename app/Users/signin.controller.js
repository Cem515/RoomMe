(function () {
    'use strict';

    angular
        .module('app')
        .controller('SignInController', SignInController)

    SignInController.$inject = ['$state', '$rootScope', 'socialLoginService', 'UserFactory','localStorageService'];

    function SignInController($state, $rootScope, socialLoginService, UserFactory, localStorageService) {

        var SignInCtrl = this; // Not using SignInCtrl
        //facebook details
        SignInCtrl.userDetails = {};
        SignInCtrl.userDetails.name = "";
        SignInCtrl.userDetails.Email = "";

        // Regular Register no Facebook
        SignInCtrl.nameObject = {};
        SignInCtrl.sObject={};
        SignInCtrl.nameObject.UserName = "";
        SignInCtrl.nameObject.Password = "";
        SignInCtrl.nameObject.Email = "";
        // SignInCtrl.nameObject.birthdate = '0000 0, 0'
        SignInCtrl.nameObject.Landlord = false;
        SignInCtrl.nameObject.ZipCode = 0;
        SignInCtrl.nameObject.Phone = "";

        //Sign In
        SignInCtrl.Registration= true;
        SignInCtrl.sObject = {};
        SignInCtrl.sObject.username='';
        SignInCtrl.sObject.password='';


        // SignInCtrl.signout = function () {socialLoginService.logout();}


        SignInCtrl.register = function (nameObject) {
            UserFactory
                .postRegistration(nameObject)
                .then(function (info) {
                    console.log(info);
                    goProfile();
                }, function (error) {
                    console.log(error);

                })

            // What happens after succesful log in
            $rootScope.$on('event:social-sign-in-success', function (event, userDetails) {
                console.log(userDetails);
            });
        }

        SignInCtrl.signIn = function (log) {
            UserFactory
                .findUsers(log)
                .then(function (signin) {
                    console.log(info);
                localStorageService.set('user', rec.userID);
                var userID = localStorageService.get('user');
                }, function (error) {
                    console.log(error);
                })
        }
        function goProfile() {
            $state.go('profile');
        }

        SignInCtrl.Switch = function() {
            SignInCtrl.login = !SignInCtrl.login;
            SignInCtrl.Registration = !SignInCtrl.Registration;
        }
    }

})();