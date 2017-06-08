using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


namespace RoomMe.Models
{
    public class User
    {
        //add public virtual
        public int UserId { get; set; }

        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool Landlord { get; set; }
        [Column(TypeName = "DateTime2")]
        public DateTime DateOfBirth { get; set; }
        public int ZipCode { get; set; }
        public string Phone { get; set; }

        public virtual ICollection<Conversation> SentConversations { get; set; }
        public virtual ICollection<Conversation> GotConversations { get; set; }
        public virtual ICollection<Bookmark> Bookmarked { get; set; }
        public virtual ICollection<Listing> ListingPosted { get; set; }

       // public virtual IEnumerable<Conversation> Conversations => SentConversations.Concat(GotConversations);

        //public virtual IEnumerable<Conversation> Conversations
        //{
        //    get
        //    {
        //        return SentConversations.Concat(GotConversations);
        //    }
        //}
    }
}