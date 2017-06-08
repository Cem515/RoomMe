
(function() {
    'use strict';

    var app = angular.module('app', ['ui.router','socialLogin', 'oitozero.ngSweetAlert','LocalStorageModule']).value('localApi', 'http://localhost:61066/api/');
    app.config(function ($stateProvider, $urlRouterProvider, socialProvider){
        $urlRouterProvider.otherwise('/Register');

        $stateProvider
            .state('register', {
                url: "/Register",
                templateUrl: "app/users/Register.html",
                controller: "SignInController",
                controllerAs : "SignInCtrl"
            })
            .state('search', {
                url: "/search",
                templateUrl: "app/search/search.html",
                controller: "SearchController",
                controllerAs : "SearchCtrl"
            })
            .state('profile', {
                url: "/Profile",
                templateUrl: "app/Profile/Profile.html",
                controller: "ProfileController",
                controllerAs : "ProfileCtrl"
            })
            .state('messages', {
                url: "/messages",
                templateUrl: "app/messages/messages.html",
                controller: "MessagesController",
                controllerAs : "MsgCtrl"
            })
            .state('addListing', {
                url: "/addlisting",
                templateUrl: "app/listings/add.listings.html",
                controller: "AddListingsController",
                controllerAs : "AddListCtrl"
            })
            .state('ownerlist', {
                url: "/ownerlist",
                templateUrl: "app/listings/owner.listings.html",
                controller: "OwnerController",
                controllerAs : "OwnListCtrl"
            })
                   socialProvider.setFbKey({appId: "129989007575185", apiVersion: "v2.9"});

    })
})();

