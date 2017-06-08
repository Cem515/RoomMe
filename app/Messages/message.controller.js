(function () {
    'use strict';

    angular
        .module('app')
        .controller('MessagesController', MessagesController)

    MessagesController.$inject = ['$state', 'MessagesFactory', 'localStorageService', 'SweetAlert'];

    function MessagesController($state, MessagesFactory, localStorageService, SweetAlert) {

        var MsgCtrl = this;
        MsgCtrl.msgObject = {};
        MsgCtrl.conObject = {};
        //Empty Variables to Be Modified
        var recID = 0;
        var convoID = 0;
        MsgCtrl.recipient = "";

        //Conversation ID Variables
        MsgCtrl.conObject.Sender_UserID = localStorageService.get('userId')
        MsgCtrl.conObject.Receiver_UserID = recID;
        //Message Object
        MsgCtrl.msgObject.Subject = "";
        MsgCtrl.msgObject.Body = "";
        MsgCtrl.msgObject.DateCreated = Date.now();
        MsgCtrl.msgObject.conversationID = {Conversation_ConversationID: convoID}


        var obj = {
    key1: value1,
    key2: value2
};

//Find The Message Recipient
        MsgCtrl.findRec = function (recipient) {
            MessagesFactory
                .getRecd(recipient)
                .then(function (rec) {
                    recFound(rec.data);
                    startConvo(MsgCtrl.conObject);
                }, function (error) {
                    SweetAlert.swal("Error Searching Users");
                })
        }
// Alert User to Success/Error
        function recFound(found) {
            if (found != 0) {
                localStorageService.set('recipient', found.userID);
                recID = localStorageService.get('recipient');
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
                                localStorageService.setItem('conversation', convo.conversationID);
                                convoID = localStorageService.get('conversation');
                            })
                    } else {
                        localStorageService.set('conversation', convo.conversationID);
                        convoID = localStorageService.get('conversation');
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