(function () {
    'use strict';
    angular
        .module('app')
        .factory('ListingFactory', ListingFactory);
    ListingFactory.$inject = ['$http', 'localApi'];
    function ListingFactory($http, localApi) {
        var service = {
            getListings: getListings,
            getOneList: getOneList,
            postListing: postListing,
            putListing: putListing,
            deleteListing: deleteListing
        };
        return service;
        ///////////////// GET LISTINGS BY USER, to display in left panel in owner.listings.html
        function getListings(userId) {
            return $http({
                Method: 'GET',
                url: localApi + 'Listings/UserListings?userId=' + userId
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log("Error" + error);
                return error;
            });
        }
        ///////////////// GET ONE LISTING, to display in right panel in owner.listings.html after selecting listing from left panel
        function getOneList(listId) {
            return $http({
                Method: 'GET',
                url: localApi + 'Listings/' + listId
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log("Error" + error);
                return error;
            });
        }
        //////////////// POST NEW LISTING, posts to database from add.listings.html
        function postListing(listingInfo) {
            console.log(listingInfo);
            return $http({
                method: 'POST',
                url: localApi + 'Listings',
                dataType: "json",
                data: listingInfo,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(function (info) {
                return info;
            }, function (error) {
                return error;
            })
        }
        ////////////////  PUT-EDIT LISTING, edit listing in right panel in owner.listings.html after selecting listing from left panel
        function putListing(listid, edits) {
            return $http({
                method: 'PUT',
                url: localApi + 'Listings/' + listid,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: edits,
            }).then(function (info) {
                console.log(info);
            }, function (error) {
                console.log(error);
            })
        }
        //////////////// DELETE LISTING, deletes listing from right panel in owner.listings.html after selecting listing from left panel
         function deleteListing(lid) {
             return $http ({
                 method: 'DELETE',
                 url: localApi + 'Listings/' + lid
           }).then (function (info){
                 console.log(info);
             }, function (error) {
                 console.log(error);
             })
         }
    }
})();