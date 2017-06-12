(function () {
    'use strict';

    angular
        .module('app')
        .controller('OwnerController', OwnerController);

    OwnerController.$inject = ['ListingFactory', 'localStorageFactory','filepickerService'];

    function OwnerController(ListingFactory, localStorageFactory, filepickerService) {
        var OwnListCtrl = this;
        OwnListCtrl.listingObject = [];
        OwnListCtrl.listingObject.address = "";
        OwnListCtrl.listingObject.city = "";
        OwnListCtrl.listingObject.description = "";
        OwnListCtrl.listingObject.picture = "";
        OwnListCtrl.listingObject.price = "";
        OwnListCtrl.listingObject.state = "";

        OwnListCtrl.callListings = function () {
            var ownerId = localStorageFactory.getLocalStorage('userId');
            ListingFactory
                .getListing(ownerId)
                .then(function (response) {
                    console.log(response.data);
                    OwnListCtrl.listingObject = response.data;

                }, function (error) {
                    console.log(error);
                })
        }
        ////////////////

        window.onload = OwnListCtrl.callListings();

        ///////////////

        OwnListCtrl.editListings = function () {
            var ownerId = localStorageFactory.getLocalStorage('userId');
            var edits = {
                "Address": ProfileCtrl.listingObject.address,
                "City": ProfileCtrl.listingObject.city,
                "Description": ProfileCtrl.listingObject.description,
                "Picture": ProfileCtrl.listingObject.picture,
                "Price": ProfileCtrl.listingObject.price,
                "State": ProfileCtrl.listingObject.state,
            }
            ListingFactory
                .putListing()
        }


    }
})();