using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RoomMe.Models
{
    public class Bookmark
    {
        [Key]
        public int BookmarkID { get; set; }

        public bool Liked { get; set; }

        public User User { get; set; }
        public Listing Listing { get; set; }
    }
}