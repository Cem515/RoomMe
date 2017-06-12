(function () {
    'use strict';

    angular
        .module('app')
        .controller('SearchController', SearchController)

    SearchController.$inject = ['$location', 'SearchFactory', 'UserFactory', 'SweetAlert','localStorageFactory', '$state'];

    function SearchController($location, SearchFactory, UserFactory, SweetAlert, localStorageFactory, $state) {
        /* jshint validthis:true */
        var SearchCtrl = this;
        SearchCtrl.srchObject = {};
        SearchCtrl.srchObject.city = "";
        SearchCtrl.srchObject.minPrice = null;
        SearchCtrl.srchObject.maxPrice = null;
        SearchCtrl.srchObject.zipCode = null;
        SearchCtrl.fullListing = false;
        SearchCtrl.showResults = false;
        SearchCtrl.ListnerName = "";

        SearchCtrl.search = function (params) {
            SearchFactory
                .searchListings(params)
                .then(function (response) {
                    matches(response.data)
                    SearchCtrl.showResults = true;
                }, function (error) {
                    console.log(error);
                })
        }

        function matches(results) {
            SearchCtrl.Results = results;
        }

        SearchCtrl.expand = function () {
            SearchCtrl.fullListing = !SearchCtrl.fullListing;
        }

        SearchCtrl.convert = function(id) {       
            UserFactory
                .getUser(id)
                .then(function (response) {
                    SearchCtrl.ListerName = response.userName;
                }, function (error) {
                    console.log(error);
                })
        }
    }
})();