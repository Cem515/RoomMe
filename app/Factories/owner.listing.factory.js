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


       ///////////////// GET LISTINGS
       function getListing (user) {
            return $http({
                Method: 'GET',
                url: localApi + 'Listings/5',
                params: user
            }).then(function (response) {
                return response;
            }, function (error) {
                console.log("Error" + error);
                return error;
            });
        }

       //////////////// POST NEW LISTING
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

        /*////////////////  PUT-EDIT LISTING
        function putListing(lingtingInfo) {
            console.log(listingInfo);
            return $http ({
                method: 'PUT',
                url: localApi + 'Listings/5',
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

        //////////////// DELETE LISTING
        function deleteListing(listingInfo) {
            console.log(listingInfo);
            return $http ({
                method: 'DELETE',
                url: localApi + 'Listings/5',
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
        }*/
    }
})();