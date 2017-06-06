(function () {
    'use strict';

    angular
        .module('app')
        .controller('SignInController', SignInController)

<<<<<<< HEAD
    SignInController.$inject = ['$state', '$rootScope', 'socialLoginService', 'userFactory', 'localStorageFactory'];

    function SignInController($state, $rootScope, socialLoginService, userFactory, localStorageFactory) {
=======
    SignInController.$inject = ['$state', '$rootScope', 'socialLoginService', 'UserFactory'];

    function SignInController($state, $rootScope, socialLoginService, UserFactory) {
>>>>>>> 72bebc9511c2e841d6a31541f031efcf8d9581fb

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
<<<<<<< HEAD
        //Sign In
        SignInCtrl.Registration = true;
        SignInCtrl.sObject.userName = "";
        SignInCtrl.sObject.password = "";
=======
        SignInCtrl.Registration= true;
        SignInCtrl.sObject = {};
        SignInCtrl.sObject.username='';
        SignInCtrl.sObject.password='';
>>>>>>> 0b2439ed0f76acc263bb3459dea4ef119d47c9bb

        SignInCtrl.register = function (nameObject) {
<<<<<<< HEAD
            console.log(nameObject);
            userFactory
                .postRegistration(nameObject) 
                .then(function (info) {
                    console.log(info)
                    var returnedUser = info.data.userId;
            localStorageFactory
                .setLocalStorage('userId', returnedUser);

            var storedVariable = localStorageFactory.getLocalStorage('userId');
                console.log(storedVariable);
=======
            UserFactory
                .postRegistration(nameObject)
                .then(function (info) {
                    console.log(info);
                    goProfile();
>>>>>>> 72bebc9511c2e841d6a31541f031efcf8d9581fb
                }, function (error) {
                    console.log(error);
                })
        }

            // What happens after succesful log in
            $rootScope.$on('event:social-sign-in-success', function (event, userDetails) {
                console.log(userDetails);
            });
         

<<<<<<< HEAD
        SignInCtrl.signIn = function(log) {
            userFactory
            .findUsers(log) 
            .then(function (signin){
                console.log(signin);
            }, function (error) {
                console.log(error);
            })
=======
        SignInCtrl.signIn = function (log) {
            UserFactory
                .findUsers(log)
                .then(function (signin) {
                    console.log(info);
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
>>>>>>> 72bebc9511c2e841d6a31541f031efcf8d9581fb
        }

        
    }

})();
