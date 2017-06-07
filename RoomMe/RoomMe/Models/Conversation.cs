using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace RoomMe.Models
{
    public class Conversation
    {
        //add public virtual
        public int ConversationID { get; set; }

        public int SenderID { get; set; }
        public int RecipientID { get; set; }

        public User Sent { get; set; }
        public User Got { get; set; }

        public virtual ICollection<Message> MessageSent { get; set; }
        public virtual ICollection<Bookmark> Bookmarks { get; set; }
    }
}