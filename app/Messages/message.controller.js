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
        MsgCtrl.conObject.Sender_UserID = localStorageFactory.getLocalStorage('userId')
        MsgCtrl.conObject.Receiver_UserID = localStorageFactory.getLocalStorage('recipient')
        //Message Object
        MsgCtrl.msgObject.Subject = "";
        MsgCtrl.msgObject.Body = "";
        MsgCtrl.msgObject.DateCreated = Date.now();
        MsgCtrl.msgObject.convoID = localStorageFactory.getLocalStorage('conversation')




        //Find The Message Recipient
        MsgCtrl.findRec = function (recipient) {
            MessagesFactory
                .getRecd(recipient)
                .then(function (rec) {
                    recFound(rec.data[0]);
                    startConvo(MsgCtrl.conObject);
                }, function (error) {
                    SweetAlert.swal("Error Searching Users");
                })
        }
        // Alert User to Success/Error
        function recFound(found) {
            if (found != 0) {
                localStorageFactory
                    .setLocalStorage('recipient', found.userId);
                localStorageFactory
                    .getLocalStorage('recipient');
                SweetAlert.swal("User Found");
            } else {
                SweetAlert.swal("User Not Found");
            }
        }

        //Find Conversation ID or Create New Conversation 
        function startConvo(convo) {
            MessagesFactory
                .converse(convo)
                .then(function (conID) {
                    if (conID.array == 0) {
                        MessagesFactory
                            .startCon(MsgCtrl.conObject)
                            .then(function (newcon) {
                                localStorageFactory
                                    .setLocalStorage('conversation', convo.conversationID);
                                localStorageFactory
                                    .getLocalStorage('conversation');;
                            })
                    } else {
                        localStorageFactory
                            .setLocalStorage('conversation', convo.conversationID)
                        localStorageFactory
                            .getLocalStorage('conversation');
                    };
                }, function (error) {
                    SweetAlert.swal("Error")
                })
        }

        MsgCtrl.sendMsg = function (msg) {
            MessagesFactory
                .sendMsg(msg)
                .then(function (sent) {
                    SweetAlert.swal("Message Sent")
                }, function (error) {
                    SweetAlert.swal("Error", "Message Failed")
                })
        }
    }
})();