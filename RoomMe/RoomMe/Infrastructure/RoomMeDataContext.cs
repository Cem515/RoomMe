using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Web;
using RoomMe.Models;

namespace RoomMe.Infrastructure
{
    public class RoomMeDataContext : DbContext
    {
        public RoomMeDataContext() : base("RoomMe")
        {

        }

        public System.Data.Entity.DbSet<RoomMe.Models.Listing> Listings { get; set; }

        public System.Data.Entity.DbSet<RoomMe.Models.User> Users { get; set; }

        public System.Data.Entity.DbSet<RoomMe.Models.Message> Messages { get; set; }

        public System.Data.Entity.DbSet<RoomMe.Models.Bookmark> Bookmarks { get; set; }

        public System.Data.Entity.DbSet<RoomMe.Models.Conversation> Conversations { get; set; }
    }
}