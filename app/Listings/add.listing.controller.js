(function () {
    'use strict';

    angular
        .module('app')
        .controller('AddListingsController', AddListingsController);

    AddListingsController.$inject = ['$state', 'ListingFactory', 'localStorageFactory', 'SweetAlert'];

    function AddListingsController($state, ListingFactory, localStorageFactory, SweetAlert) {
        var AddListCtrl = this;

        AddListCtrl.listObject = {};
        AddListCtrl.listObject.description = "";
        AddListCtrl.listObject.price = 0;
        AddListCtrl.listObject.address = "";
        AddListCtrl.listObject.city = "";
        AddListCtrl.listObject.state = "";
        AddListCtrl.listObject.zipCode = 0;
        AddListCtrl.listObject.picture = '/imagepath';
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

        function goBack() {
            $state.go('profile');
        }
    }
})();