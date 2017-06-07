
namespace RoomMe.Models
{
    public class Bookmark
    {
  // add public virtual
        public int BookmarkID { get; set; }

        public bool Liked { get; set; }
        public int UserLikeId { get; set; }
        public int ListingLikeId { get; set; }


        public virtual User UserProfile { get; set; }
        public virtual Listing LikedListing { get; set; }
    }
}