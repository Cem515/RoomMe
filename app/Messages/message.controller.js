(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('MessagesController', MessagesController)

    MessagesController.$inject = ['MessagesFactory', 'localStorageService', 'SweetAlert'];

    function MessagesController(MessagesFactory, localStorageService, SweetAlert) {

        var MsgCtrl = this;
        MsgCtrl.msgObject = {};
        MsgCtrl.conObject = {};
        var recID = 0;
        MsgCtrl.conObject.recipient = "";
        MsgCtrl.msgObject.sender = localStorageService.get('user');
        MsgCtrl.msgObject.receiver = recID;

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
                recID = localStorageService.get('recipient');
                SweetAlert.swal("User Found");
            } else {
                SweetAlert.swal("User Not Found");
            }
        }
    }
})();