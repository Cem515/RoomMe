(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController)

    ProfileController.$inject = ['$state', 'UserFactory', 'localStorageFactory', 'SweetAlert'];

    function ProfileController($state, UserFactory, localStorageFactory, SweetAlert) {
        /* jshint validthis:true */
        function ProfileController($state, UserFactory, localStorageFactory, SweetAlert) {
            var ProfileCtrl = this;
            ProfileCtrl.userInfo = {};
            ProfileCtrl.userInfo.userName = ProfileCtrl.userInfo.userName;
            ProfileCtrl.userInfo.bookmarked = '';
            ProfileCtrl.userInfo.gotConversations = '';
            ProfileCtrl.userInfo.listingPosted = '';
            ProfileCtrl.userInfo.sentConversations = '';
            ProfileCtrl.userInfo.password = ProfileCtrl.userInfo.password;
            ProfileCtrl.userInfo.email = ProfileCtrl.userInfo.email;
            ProfileCtrl.userInfo.landlord = ProfileCtrl.userInfo.landlord;
            ProfileCtrl.userInfo.zipCode = ProfileCtrl.userInfo.zipCode;
            ProfileCtrl.userInfo.phone = ProfileCtrl.userInfo.phone;
            ProfileCtrl.userInfo.dateOfBirth = ProfileCtrl.userInfo.dateOfBirth;
            var id = localStorageFactory.getLocalStorage('userId');

            ProfileCtrl.loadProfileInfo = function () {
                console.log(id);
            UserFactory.getUser(id).then(function (response) {
                console.log(response);
                ProfileCtrl.userInfo = response;

            })
        }
        window.onload = ProfileCtrl.loadProfileInfo(id);

        ProfileCtrl.signout = function () {
            localStorageFactory.logout();
            SweetAlert.swal("Log Out Successful", "Take Care Now, Bye-Bye Then!")
            $state.go('register')
        }

        ProfileCtrl.editProfile = function () {
            var id = localStorageFactory.getLocalStorage('userId')
            var edit = {
                "UserId": id,
                "UserName": ProfileCtrl.userInfo.userName,
                "Password": ProfileCtrl.userInfo.password,
                "Email": ProfileCtrl.userInfo.email,
                "Landlord": ProfileCtrl.userInfo.landlord,
                "DateOfBirth": ProfileCtrl.userInfo.dateOfBirth,
                "ZipCode": ProfileCtrl.userInfo.zipCode,
                "Phone": ProfileCtrl.userInfo.phone,
            }
            UserFactory.updateInfo(id, edit);
            SweetAlert.swal("Information Updated", "Refreshing Page...", "success");
            $state.reload();
        }

        ProfileCtrl.goAddListingPage = function () {
            $state.go('addListing');
        }

        ProfileCtrl.showListingButton = function (landlordBool) {
            if (landlordBool == true) {
                return true;
            } else {
                return false;
            }
        }
        }
    }
})();