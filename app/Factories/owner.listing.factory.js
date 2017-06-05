(function() {
    'use strict';

   angular
        .module('app')
        .factory('ListingFactory', ListingFactory);

   ListingFactory.$inject = ['$http', 'localApi'];
    function ListingFactory($http, localApi) {
        var service = {
            postListing:postListing
        };
        
       return service;

       ////////////////
        function postListing(listingInfo) {
            console.log(listingInfo);
            return $http ({
                method: 'POST',
                url: localApi + 'Listings',
                dataType: "json",
                data: listingInfo,
                headers: {
                'Content-Type': 'application/json; charset=utf-8'
                }

           }).then (function (info){
                return info;
            }, function (error) {
                return error;
            })
        }
    }
})();