(function() {
    'use strict';

   angular
        .module('app')
        .controller('ProfileController', ProfileController);

   ProfileController.$inject = ['$state', 'UserFactory', 'localStorageFactory'];
    function ProfileController($state, UserFactory, localStorageFactory) {
        var ProfileCtrl = this;
        ProfileCtrl.userInfo.details = {};
        ProfileCtrl.userInfo.UserName = "";
        ProfileCtrl.userInfo.Email = "";
        ProfileCtrl.userInfo.ZipCode = 0;
        ProfileCtrl.userInfo.BirthDate = "";
        ProfileCtrl.userInfo.Password = "";

       ProfileCtrl.loadProfileInfo = function() {
            var id = localStorageFactory.getLocalStorage('userId');
            UserFactory.getUser(id).then(function(response) {
                console.log(response);
                userInfo.details = response;


           })
        }

   }
})();