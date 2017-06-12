(function () {
    'use strict';

    angular
        .module('app')
        .controller('AddListingsController', AddListingsController);

    AddListingsController.$inject = ['$state', 'ListingFactory', 'localStorageFactory', 'SweetAlert', 'filepickerService'];

    function AddListingsController($state, ListingFactory, localStorageFactory, SweetAlert, filepickerService) {
        var AddListCtrl = this;

        AddListCtrl.listObject = {};
        AddListCtrl.listObject.description = "";
        AddListCtrl.listObject.price = 0;
        AddListCtrl.listObject.address = "";
        AddListCtrl.listObject.city = "";
        AddListCtrl.listObject.state = "";
        AddListCtrl.listObject.zipCode = 0;
        AddListCtrl.listObject.picture = '';
        AddListCtrl.listObject.userID = localStorageFactory.getLocalStorage('userId');

        ////////////////

        AddListCtrl.addListing = function (listingInfo) {
            ListingFactory
                .postListing(listingInfo)
                .then(function (response) {
                    console.log(response);
                    SweetAlert.swal("Successfully Posted", "Going back to your profile", "success");
                    goBack();
                }, function (error) {
                    console.log(error);
                })
        }

        AddListCtrl.pickFile = function () {
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
                    AddListCtrl.listObject.picture = Blob.url;
            })
        }

        function goBack() {
            $state.go('profile');
        }
    }
})();