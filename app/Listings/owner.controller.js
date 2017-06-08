(function () {
    'use strict';

    angular
        .module('app')
        .controller('OwnerController', OwnerController);

    OwnerController.$inject = ['ListingFactory', 'localStorageFactory'];

    function OwnerController(ListingFactory, localStorageFactory) {
        var OwnListCtrl = this;
        OwnListCtrl.listingObject = [];

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

    }
})();