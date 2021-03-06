(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController)

    ProfileController.$inject = ['$state', 'UserFactory', 'localStorageFactory', 'SweetAlert', 'filepickerService'];

    function ProfileController($state, UserFactory, localStorageFactory, SweetAlert, filepickerService) {
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
        ProfileCtrl.userInfo.image = '';
        // Stored Local UserId
        var id = localStorageFactory.getLocalStorage('userId');

        // Stores and retrieves user id
        ProfileCtrl.loadProfileInfo = function () {
            // console.log(id);
            UserFactory.getUser(id).then(function (response) {
                // console.log(response);
                ProfileCtrl.userInfo = response;
                var storedImage = localStorage.getItem('image');
            })
        }

        // When window loads, load function above ^
        window.onload = ProfileCtrl.loadProfileInfo(id);

        // Sign out form profile
        ProfileCtrl.signout = function () {
            localStorageFactory.logout();
            SweetAlert.swal("Successfully Signed Out!", "Please Come Back Soon", "success");
            $state.go('register')
        }

        // Edit profile information
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
                "Image": ProfileCtrl.userInfo.image
            }
            UserFactory.updateInfo(id, edit).then(function (response) {
                // console.log(response);
            }, function (error) {
                console.log(error);
            });
            SweetAlert.swal("Information Updated", "Hit Go Back to see update! :)", "success");
        }

        // Btn click function go to Add Listing Page
        ProfileCtrl.goAddListingPage = function () {
            $state.go('addListing');
        }

        // Btn click function go to Your Listing Page
        ProfileCtrl.yourListings = function () {
            $state.go('ownerlist');
        }

        // Shows Listing information depending on if landlord or not
        ProfileCtrl.showListingButton = function (landlordBool) {
            if (landlordBool == true) {
                return true;
            } else {
                return false;
            }

        }

        // Image upload 
        ProfileCtrl.pickFile = function () {
            filepickerService.pick({
                mimetype: 'image/*',
                containter: 'modal',
                maxSize: 1024 * 1024 * 5,
                imageMax: [200, 200],
                cropRatio: 1 / 1,
                services: ['COMPUTER', 'FACEBOOK']
            },
                function onSuccess(Blob) {
                    console.log(Blob);
                    ProfileCtrl.userInfo.image = Blob.url;
                })
        }

        ProfileCtrl.goMessenger = function () {
            $state.go('messages');
        }
        
    }
})();