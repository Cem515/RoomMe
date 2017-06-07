using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace RoomMe.Models
{
    public class Message
    {
//add public virtual
        public int MessageID { get; set; }

        public string Subject { get; set; }
        public string Body { get; set; }
        public DateTime DateCreated { get; set; }
        public int ConvoId { get; set; }

        public Conversation Conversations { get; set; }


    }
}