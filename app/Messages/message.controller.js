(function () {
    'use strict';
    angular
        .module('app')
        .controller('MessagesController', MessagesController)
    MessagesController.$inject = ['$state', 'MessagesFactory', 'UserFactory', 'localStorageFactory', 'SweetAlert'];

    function MessagesController($state, MessagesFactory, UserFactory, localStorageFactory, SweetAlert) {
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
        MsgCtrl.fullMessage = false;
        MsgCtrl.completeMessage = false;
        MsgCtrl.resubmit = false;


        var id = localStorageFactory.getLocalStorage('userId');
    //    window.onload 
        MsgCtrl.init= function () {
            MessagesFactory
                .getMessageHistory(id)
                .then(function (history) {
                    MsgCtrl.MessageHistory = history;
                    if (localStorageFactory.getLocalStorage("sellerName") != null) {
                        MsgCtrl.recipient = localStorageFactory.getLocalStorage("sellerName")
                        MsgCtrl.findRec(MsgCtrl.recipient);
                        MsgCtrl.resubmit = true;
                    }
                }, function (error) {
                    console.log(error);
                })
        };



        //      });
        //Find The Message Recipient
        MsgCtrl.findRec = function (recipient) {
            MessagesFactory
                .getRecd(recipient)
                .then(function (rec) {
                    recFound(rec.data[0]);
                    MsgCtrl.conObject.SenderId = parseInt(localStorageFactory.getLocalStorage('userId'));
                    MsgCtrl.conObject.RecipientId = parseInt(localStorageFactory.getLocalStorage('recipient'));
                    startConvo(MsgCtrl.conObject);
                    MsgCtrl.resubmit = true;
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
                                    .setLocalStorage('conversation', newcon.data.conversationID)
                            })
                    } else {
                        localStorageFactory
                            .setLocalStorage('conversation', conID[0].conversationID)
                        MessagesFactory
                            .getHistory(conID[0].conversationID)
                            .then(function (past) {
                                MsgCtrl.PastMessages = past;
                            })
                    };
                }, function (error) {
                    SweetAlert.swal("Error")
                })
        }
        MsgCtrl.sendMsg = function (msg) {
            MsgCtrl.msgObject.convoID = localStorageFactory.getLocalStorage('conversation');
            MessagesFactory
                .sendMessage(msg)
                .then(function (sent) {
                    SweetAlert.swal("Message Sent")
                    MessagesFactory
                        .getHistory(MsgCtrl.msgObject.convoID)
                        .then(function (past) {
                            MsgCtrl.PastMessages = past;
                        })
                }, function (error) {
                    SweetAlert.swal("Error", "Message Failed")
                })
        }
        MsgCtrl.ShowMsg = function () {
            MsgCtrl.fullMessage = !MsgCtrl.fullMessage;
        }

        MsgCtrl.Convert = function (iid) {
                MessagesFactory
                    .Conversationalists(iid)
                    .then(function (users) {
                        if (users.recipientID = id) {
                            UserFactory
                                .getUser(users.senderID)
                                .then(function (post) {
                                    MsgCtrl.OtherUser = post.userName;
                                    MsgCtrl.completeMessage = !MsgCtrl.completeMessage;
                                }, function (error) {
                                    return error;
                                })
                        } else if (users.SenderID = id) {
                            UserFactory
                                .getUser(users.recipientID)
                                .then(function (post) {
                                    MsgCtrl.OtherUser = post.userName;
                                    MsgCtrl.completeMessage = !MsgCtrl.completeMessage;
                                }, function (error) {
                                    return error;
                                })
                        } else {
                            SweetAlert.swal("No Conversation Exists", "Check the Conversation ID");
                        }
                    })
            },
            function (error) {
                SweetAlert.swal("No Conversation Found", "Try again")
            }

        MsgCtrl.reenter = function () {
            MsgCtrl.resubmit = false;
        };
    }
})();