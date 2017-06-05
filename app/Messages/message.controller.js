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

            var recID = 0;
            var convoID = 0;
            MsgCtrl.recipient = "";
            

            MsgCtrl.msgObject.sender = localStorageService.get('user');
            MsgCtrl.msgObject.receiver = recID;


            MsgCtrl.findRec = function (recipient) {
                MessagesFactory
                    .getRecd(recipient)
                    .then(function (rec) {
                        recFound(rec.data);
                        startConvo(MsgCtrl.msgObject);
                    }, function (error) {
                        SweetAlert.swal("Error Searching Users");
                    })
            }

            function recFound(found) {
                if (found != 0) {
                    localStorageService.set('recipient', found.userID);
                    recID = localStorageService.get('recipient');
                    SweetAlert.swal("User Found");
                } else {
                    SweetAlert.swal("User Not Found");
                }
            }

            function startConvo(convo) {
                MessagesFactory
                    .converse(convo)
                    .then(function (conID) {
                            if (conID.array = 0) {
                                MessagesFactory
                                    .startCon()
                            } else {
                                localStorageService.set('conversation', convo.conversationID);
                                convoID = localStorageService.get('conversation');
                            };
                        }, function (error) {
                            SweetAlert.swal("Error")
                        })

            }
                    }
            })();