(function () {
    'use strict';

    angular
        .module('app')
        .factory('SearchFactory', SearchFactory)

    SearchFactory.$inject = ['$http', 'localApi'];

    function SearchFactory($http, localApi) {
        var service = {
            searchListings: searchListings,
            getOneList: getOneList
        };

        return service;

        function searchListings(details) {

            return $http({
                Method: 'GET',
                url: localApi + 'Listings/ListingSearch',
                params: details
            }).then(function (response) {
                return response;
            }, function (error) {
                console.log("Error" + error);
                return error;
            })
        }

        function getOneList(listId) {
            return $http({
                Method: 'GET',
                url: localApi + 'Listings/' + listId
           }).then(function (response) {
            return response.data;
        }, function (error) {
            console.log('Error' + error);
            return error;
        });
    }
}
})();