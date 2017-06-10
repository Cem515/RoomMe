(function () {
    'use strict';

    angular
        .module('app')
        .controller('SearchController', SearchController)

    SearchController.$inject = ['$location', 'SearchFactory','UserFactory'];

    function SearchController($location, SearchFactory,UserFactory) {
        /* jshint validthis:true */
        var SearchCtrl = this;
        SearchCtrl.srchObject = {};
        SearchCtrl.srchObject.city = "";
        SearchCtrl.srchObject.minPrice = null;
        SearchCtrl.srchObject.maxPrice = null;
        SearchCtrl.srchObject.zipCode = null;
        SearchCtrl.fullListing = false;
        SearchCtrl.showResults = false;
        var arrayIndex = -1;

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
            arrayIndex++;
            UserFactory
                .getUser(results[arrayIndex].userId)
                .then(function (response) {
                    SearchCtrl.ListerId = response.userName;
                }, function (error) {
                    console.log(error);
                })
        }

        SearchCtrl.expand = function () {
            SearchCtrl.fullListing = !SearchCtrl.fullListing;
        }
    }
})();