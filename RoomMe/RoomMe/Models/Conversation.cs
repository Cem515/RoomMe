using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RoomMe.Models
{
    public class Conversation
    {
        [Key]
        public int ConversationID { get; set; }


        public User Sender { get; set; }
        public User Recipient { get; set; }
    }
}