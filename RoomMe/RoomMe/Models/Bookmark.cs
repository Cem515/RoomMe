using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace RoomMe.Models
{
    public class Bookmark
    {
        [Key]
        public int BookmarkID { get; set; }

        public bool Liked { get; set; }
        public int UserLikeId { get; set; }
        public int ListingLikeId { get; set; }

        [ForeignKey("UserLikeId")]
        public User UserProfile { get; set; }
        [ForeignKey("ListingLikeId")]
        public Listing LikedListing { get; set; }
    }
}