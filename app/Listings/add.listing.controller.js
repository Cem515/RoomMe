(function () {
    'use strict';

    angular
        .module('app')
        .controller('AddListingsController', AddListingsController);

    AddListingsController.$inject = ['ListingFactory'];

    function AddListingsController(ListingFactory) {
        var AddListCtrl = this;

        AddListCtrl.listObject = {};
        AddListCtrl.listObject.description = "";
        AddListCtrl.listObject.price = 0;
        AddListCtrl.listObject.address = "";
        AddListCtrl.listObject.city = "";
        AddListCtrl.listObject.state = "";
        AddListCtrl.listObject.zipCode = 0;
        AddListCtrl.listObject.picture = '/imagepath';
        AddListCtrl.listObject.userID = 1;

        ////////////////

        AddListCtrl.addListing = function (listingInfo) {
            ListingFactory
                .postListing(listingInfo)
                .then(function (response) {
                    console.log(response);

                }, function (error) {
                    console.log(error);
                })
        }
    }
})();