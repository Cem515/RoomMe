(function () {
    'use strict';
    angular
        .module('app')
        .controller('OwnerController', OwnerController);
    OwnerController.$inject = ['$state', 'ListingFactory', 'localStorageFactory', 'SweetAlert', 'filepickerService'];
    function OwnerController($state, ListingFactory, localStorageFactory, SweetAlert, filepickerService) {
        var OwnListCtrl = this;
        ///// All listings by user, shows on left panel
        OwnListCtrl.listingObject = [];
        OwnListCtrl.listingObject.description = "";
        OwnListCtrl.listingObject.listingID = 0;
        ///// One listing after selection, shows on right panel
        OwnListCtrl.oneObject = {};
        OwnListCtrl.oneObject.address = "";
        OwnListCtrl.oneObject.city = "";
        OwnListCtrl.oneObject.description = "";
        OwnListCtrl.oneObject.picture = "";
        OwnListCtrl.oneObject.price = "";
        OwnListCtrl.oneObject.state = "";
        OwnListCtrl.oneObject.zipcode = 0;
        OwnListCtrl.oneObject.listingID = 0;
        ///////////////
        // Gets all listings to show on left panel
        OwnListCtrl.callListings = function () {
            var ownerId = localStorageFactory.getLocalStorage('userId');
            ListingFactory
                .getListings(ownerId)
                .then(function (response) {
                    console.log(response);
                    OwnListCtrl.listingObject = response;
                }, function (error) {
                    console.log(error);
                })
        }
        ////////////////
        // Immediately populates group of listings to display in left panel
        window.onload = OwnListCtrl.callListings();
        ///////////////
        // Called when listing in left panel is selected to show on right panel
        OwnListCtrl.oneListing = function (listid) {
            ListingFactory.getOneList(listid)
                .then(function (response) {
                    console.log(response);
                    OwnListCtrl.oneObject = response;
                }, function (error) {
                    console.log(error);
                })
        }
        // Called when clicking 'Submit Changes' to edit only the listing selected
        OwnListCtrl.editListings = function (id) {
            var edits = {
                "ListingID": id,
                "Address": OwnListCtrl.oneObject.address,
                "City": OwnListCtrl.oneObject.city,
                "Description": OwnListCtrl.oneObject.description,
                "Picture": OwnListCtrl.oneObject.picture,
                "Price": OwnListCtrl.oneObject.price,
                "State": OwnListCtrl.oneObject.state,
                "Zipcode": OwnListCtrl.oneObject.zipcode,
                "UserID": OwnListCtrl.oneObject.userId
            }
            ListingFactory.putListing(id, edits)
                .then(function (response) {
                    console.log(response);
                    SweetAlert.swal("Listing Updated", "Please hit 'Go back' button", "success")
                }, function (error) {
                    console.log(error);
                })
        }
        // Called when uploading a new image after clicking Edit for the selected listing
        OwnListCtrl.pickFile = function () {
            filepickerService.pick({
                mimetype: 'image/*',
                containter: 'modal',
                maxSize: 1024 * 1024 * 5,
                imageMax: [100, 100],
                cropRatio: 1 / 1,
                services: ['COMPUTER', 'FACEBOOK']
            },
                function onSuccess(Blob) {
                    console.log(Blob);
                    OwnListCtrl.oneObject.picture = Blob.url;
                })
        }
        // Called when clicking Delete Warning button after selecting a listing
        OwnListCtrl.delListing = function (listid) {
            ListingFactory.deleteListing(listid)
                .then(function (response) {
                    console.log(response);
                    SweetAlert.swal("Listing deleted", "Deleted", "success")
                    $state.reload();
                }, function (error) {
                    console.log(error);
                })
        }
    }
})();