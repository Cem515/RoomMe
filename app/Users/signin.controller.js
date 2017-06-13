(function () {
    'use strict';

    angular
        .module('app')
        .controller('SignInController', SignInController)

    SignInController.$inject = ['$state', '$rootScope', 'socialLoginService', 'UserFactory', 'localStorageFactory', 'SweetAlert'];

    function SignInController($state, $rootScope, socialLoginService, UserFactory, localStorageFactory, SweetAlert) {

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
        // SignInCtrl.nameObject.birthdate = '0000 0, 0'
        SignInCtrl.nameObject.Landlord = false;
        SignInCtrl.nameObject.ZipCode = null;
        SignInCtrl.nameObject.Phone = "";
        SignInCtrl.Registration = false;
        SignInCtrl.sObject = {};
        SignInCtrl.sObject.username = '';
        SignInCtrl.sObject.password = '';
        SignInCtrl.Login = true;
        SignInCtrl.button = "Register Now"
        SignInCtrl.SignedIn = true;


window.onload = function() {
    if(localStorageFactory.getLocalStorage('userId') == null) {
        SignInCtrl.SignedIn = true;
    } else {
        SignInCtrl.SignedIn = false;
    };
}

        SignInCtrl.register = function (nameObject) {
            UserFactory
                .postRegistration(nameObject)
                .then(function (info) {
                    var returnedUser = info.data.userId;
                    localStorageFactory
                        .setLocalStorage('userId', returnedUser);
                    var storedVariable = localStorageFactory.getLocalStorage('userId');
                    goProfile();
               //     SweetAlert.swal("Account Created", "Welcome", "Success")
                }, function (error) {
                    console.log(error);
                })
        }

        // What happens after succesful log in
        $rootScope.$on('event:social-sign-in-success', function (event, userDetails) {
            console.log(userDetails);
        });

        SignInCtrl.signIn = function (log) {
            UserFactory
                .findUsers(log)
                .then(function (response) {
                    if (response !== undefined) {
                        var responseId = response.userId;
                        localStorageFactory.setLocalStorage('userId', responseId);
                        var storedInfo = localStorageFactory.getLocalStorage('userId');
                        goProfile();
                        SweetAlert.swal("Successfully Signed In", "Welcome", "success")
                    } else {
                        SweetAlert.swal("Incorrect Information", "No Record Found", "warning");
                        SignInCtrl.sObject.username = "";
                        SignInCtrl.sObject.password = "";
                    }
                }, function (error) {
                    console.log(error);
                })
        }
        // Change to profile after success!
        function goProfile() {
            $state.go('profile');
        }

        SignInCtrl.Switch = function () {
            SignInCtrl.Login = !SignInCtrl.Login;
            SignInCtrl.Registration = !SignInCtrl.Registration;
        }
    }

})();