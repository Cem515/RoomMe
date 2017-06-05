(function () {
    'use strict';

    angular
        .module('app')
        .controller('SignInController', SignInController)

    SignInController.$inject = ['$state', '$rootScope', 'socialLoginService', 'UserFactory', 'localStorageService', 'SweetAlert'];

    function SignInController($state, $rootScope, socialLoginService, UserFactory, localStorageService, SweetAlert) {

        var SignInCtrl = this; // Not using SignInCtrl
        //facebook details
        SignInCtrl.userDetails = {};
        SignInCtrl.userDetails.name = "";
        SignInCtrl.userDetails.Email = "";

        // Regular Register no Facebook
        SignInCtrl.nameObject = {};
        SignInCtrl.sObject = {};
        SignInCtrl.nameObject.UserName = "";
        SignInCtrl.nameObject.Password = "";
        SignInCtrl.nameObject.Email = "";
        SignInCtrl.nameObject.Landlord = false;
        SignInCtrl.nameObject.ZipCode = 0;
        SignInCtrl.nameObject.Phone = "";

        //Sign In
        SignInCtrl.Registration = false;
        SignInCtrl.sObject = {};
        SignInCtrl.sObject.username = '';
        SignInCtrl.sObject.password = '';
        SignInCtrl.Login = true;
        SignInCtrl.button = "New? Register Now"

        var userID = 0;


        // SignInCtrl.signout = function () {socialLoginService.logout();}


        SignInCtrl.register = function (nameObject) {
            UserFactory
                .postRegistration(nameObject)
                .then(function (info) {
                    goProfile();
                    localStorageService.set('user', info.userID);
                    userID = localStorageService.get('user');
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
                    console.log(signin);
                    localStorageService.set('user', signin.userID);
                    userID = localStorageService.get('user');
                    goProfile();
                    SweetAlert.swal("Successfully Signed In","Welcome","success")
                }, function (error) {
                    console.log(error);
                })
        }

        function goProfile() {
            $state.go('profile');
        }

        SignInCtrl.Switch = function () {
            SignInCtrl.Login = !SignInCtrl.Login;
            SignInCtrl.Registration = !SignInCtrl.Registration;
        }
    }

})();