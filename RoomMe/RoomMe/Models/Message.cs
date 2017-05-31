using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RoomMe.Models
{
    public class Message
    {
        [Key]
        public int MessageID { get; set; }

        public string Subject { get; set; }
        public string Body { get; set; }
        public DateTime DateCreated { get; set; }

        public Conversation Conversation { get; set; }
    }
}