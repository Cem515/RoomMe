(function () {
    'use strict';

    var app = angular.module('app', ['ui.router', 'LocalStorageModule']).value('localApi', 'http://localhost:61066/');
    app.config(function ($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

        localStorageServiceProvider.setPrefix('app').setStorageType('sessionStorage').setNotify(true, true);
        $urlRouterProvider.otherwise('/Register');

        $stateProvider
            .state('register', {
                url: "/Register",
                templateUrl: "app/users/Register.html",
                controller: "SignInController",
                controllerAs: "SignInCtrl"
            })
            .state('search', {
                url: "/search",
                templateUrl: "app/search/search.html",
                controller: "SearchController",
                controllerAs: "SearchCtrl"
            })
            .state('profile', {
                url: "/Profile",
                templateUrl: "app/profile/Profile.html",
                controller: "ProfileController",
                controllerAs: "ProfileCtrl"
            })
            .state('messages', {
                url: "/messages",
                templateUrl: "app/messages/messages.html",
                controller: "MessagesController",
                controllerAs: "MsgCtrl"
            })
            .state('addListing', {
                url: "/addlistings",
                templateUrl: "app/listings/add.listings.html",
                controller: "AddListingsController",
                controllerAs: "AddListCtrl"
            })
            .state('ownerList', {
                url: "/ownerlist",
                templateUrl: "app/listings/owner.listings.html",
                controller: "OwnListingsController",
                controllerAs: "OwnListCtrl"
            })
    })
})();