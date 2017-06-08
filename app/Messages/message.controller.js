(function () {
    'use strict';

    angular
        .module('app')
        .controller('MessagesController', MessagesController)

    MessagesController.$inject = ['$state', 'MessagesFactory', 'localStorageFactory', 'SweetAlert'];

    function MessagesController($state, MessagesFactory, localStorageFactory, SweetAlert) {

        var MsgCtrl = this;
        MsgCtrl.msgObject = {};
        MsgCtrl.conObject = {};
        //Empty Variables to Be Modified
        MsgCtrl.recipient = "";

        //Conversation ID Variables
        MsgCtrl.conObject.SenderId = 0;
        MsgCtrl.conObject.RecipientId = 0;
        //Message Object
        MsgCtrl.msgObject.Subject = "";
        MsgCtrl.msgObject.Body = "";
        MsgCtrl.msgObject.DateCreated = Date.now();
        MsgCtrl.msgObject.convoID = parseInt(localStorageFactory.getLocalStorage('conversation'));




        //Find The Message Recipient
        MsgCtrl.findRec = function (recipient) {
            MessagesFactory
                .getRecd(recipient)
                .then(function (rec) {
                    recFound(rec.data[0]);
                    MsgCtrl.conObject.SenderId = parseInt(localStorageFactory.getLocalStorage('userId'));
                    MsgCtrl.conObject.RecipientId = parseInt(localStorageFactory.getLocalStorage('recipient'));
                    startConvo(MsgCtrl.conObject);
                }, function (error) {
                    SweetAlert.swal("Error Searching Users");
                })
        }
        // Alert User to Success/Error
        function recFound(found) {
            if (found != undefined) {
                localStorageFactory
                    .setLocalStorage('recipient', found.userId);
                localStorageFactory
                    .getLocalStorage('recipient');
                SweetAlert.swal("User Found");
            } else {
                SweetAlert.swal("User Not Found", "error");
            }
        }

        //Find Conversation ID or Create New Conversation 
        function startConvo(convo) {
            MessagesFactory
                .converse(convo)
                .then(function (conID) {
                    if (conID.length == 0) {
                        MessagesFactory
                            .startCon(MsgCtrl.conObject)
                            .then(function (newcon) {
                                localStorageFactory
                                    .setLocalStorage('conversation', conID.conversationID);
                                localStorageFactory
                                    .getLocalStorage('conversation');
                            })
                    } else {
                        localStorageFactory
                            .setLocalStorage('conversation', conID.conversationID)
                        localStorageFactory
                            .getLocalStorage('conversation');
                    };
                }, function (error) {
                    SweetAlert.swal("Error")
                })
        }

        MsgCtrl.sendMsg = function (msg) {
            MessagesFactory
                .sendMessage(msg)
                .then(function (sent) {
                    SweetAlert.swal("Message Sent")
                }, function (error) {
                    SweetAlert.swal("Error", "Message Failed")
                })
        }
    }
})();