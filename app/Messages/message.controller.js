(function () {
    'use strict';

    angular
        .module('app')
        .controller('MessagesController', MessagesController)

    MessagesController.$inject = ['MessagesFactory', 'localStorageService'];

    function MessagesController(MessagesFactory, localStorageService) {

        var MsgCtrl = this;
        MsgCtrl.msgObject = {};
        MsgCtrl.conObject = {};
        MsgCtrl.conObject.recipient = "";

        MsgCtrl.findRec = function (recipient) {
            MessagesFactory
                .getRecd(recipient)
                .then(function (rec) {
                    recFound(rec.data)
                    console.log(rec)
                }, function (error) {
                    SweetAlert.swal("Error Searching Users");
                })
        }

        function recFound(found) {
            if (found != 0) {
                localStorageService.set('recipient', rec.userID);
                var recID = localStorageService.get('recipient');
                SweetAlert.swal("User Found");
            } else {
                SweetAlert.swal("User Not Found");
            }
        }
    }
})();