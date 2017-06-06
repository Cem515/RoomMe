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
        [Key]
        public int ConversationID { get; set; }

        public int SenderID { get; set; }
        public int RecipientID { get; set; }

        [ForeignKey("SenderID")]
        public User Sent { get; set; }
        [ForeignKey("RecipientID")]
        public User Got { get; set; }

        public ICollection<Message> Messages { get; set; }
        public ICollection<Bookmark> Bookmarks { get; set; }
    }
}