(function () {
    'use strict';

   angular
        .module('app')
        .controller('OwnerController', OwnerController);

   OwnerController.$inject = ['ListingFactory', 'localStorageFactory'];
    function OwnerController(ListingFactory, localStorageFactory) {
        var OwnListCtrl = this;
        var ownerId = localStorageFactory.getLocalStorage('userID');

       OwnListCtrl.callListings = function (ownerId) {
            
           ListingFactory
                .getListing(ownerId)
                
               .then(function (response) {
                    displayListings(response.data);
                    console.log(response);

               }, function (error) {
                    console.log(error);
                })
        }
        ////////////////

       function displayListings(results) {
            OwnListCtrl.ownerListings = results;
            console.log(OwnListCtrl.ownerListings);
            console.log(results.data);
        };
    }
})();