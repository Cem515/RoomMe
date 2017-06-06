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

                    localStorageService.setItem('user', info.userID);
                    userID = localStorageService.get('user');
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
                .then(function (response) {
                    response.data.userID = localStorage.getItem("user");
                    goProfile();
                    SweetAlert.swal("Successfully Signed In", "Welcome", "success")
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