(function(){
    'use strict';

   angular
        .module('app')
        .controller('SearchController', SearchController)

   SearchController.$inject = ['$location', 'SearchFactory'];

   function SearchController($location, SearchFactory) {
        /* jshint validthis:true */
        var SearchCtrl = this;
        SearchCtrl.srchObject = {};
        SearchCtrl.srchObject.city= "";
        SearchCtrl.srchObject.minPrice=null;
        SearchCtrl.srchObject.maxPrice=null;
        SearchCtrl.srchObject.zipCode=null;
        SearchCtrl.fullListing = false;
        SearchCtrl.showResults = false;

       SearchCtrl.search = function (params){
        SearchFactory
            .searchListings(params)
            .then(function (response){
                matches(response.data)
                SearchCtrl.showResults = true;
            }, function (error) {
                console.log(error);
            })
        }

      function matches (results) {
           SearchCtrl.Results = results;
           console.log(results);
       }

      SearchCtrl.expand = function() {
           SearchCtrl.fullListing = !SearchCtrl.fullListing;
       }
    }
})();
