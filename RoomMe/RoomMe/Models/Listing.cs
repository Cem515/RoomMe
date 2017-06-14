using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace RoomMe.Models
{
    public class Listing
    {
// add public virtual
        public int ListingID { get; set; }

        public string Description { get; set; }
        public int Price { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int Zipcode { get; set; }
        public string Picture { get; set; }
        public int UserId { get; set; }

        public User User { get; set; }

        public virtual ICollection<Bookmark> Bookmarks { get; set; }
        public virtual ICollection<User> UserPosted { get; set; }
    }
}