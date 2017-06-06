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

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    {
        //        //Conversation -> Sent(UserId)
        //        modelBuilder.Entity<Conversation>()
        //                .HasRequired(u => u.Sent)
        //                .WithMany(c => c.Conversations)
        //                .HasForeignKey(u => u.SenderID);

        //        base.OnModelCreating(modelBuilder);
        //    }
        //    {
        //        //Conversation -> Received(UserId)
        //        modelBuilder.Entity<Conversation>()
        //                .HasRequired(u => u.Got)
        //                .WithMany(c => c.Conversations)
        //                .HasForeignKey(u => u.RecipientID);

        //        base.OnModelCreating(modelBuilder);
        //    }
        //    {
        //        //Messages -> Conversation Id
        //        modelBuilder.Entity<Conversation>()
        //                .HasMany(m => m.Messages)
        //                .WithRequired(m => m.Conversation)
        //                .HasForeignKey(c => c.ConvoId);

        //        base.OnModelCreating(modelBuilder);
        //    }
        //{
        // Bookmarks -> Users
        //    modelBuilder.Entity<Bookmark>()
        //                .HasMany(s => s.ListingLikeId)
        //                .WithRequired(b => )
        //                .HasForeignKey(s => s.StdId);

        //}
        //{
        // Bookmarks -> Listings
        //    modelBuilder.Entity<Bookmark>()
        //                .HasMany(s => s.ListingLikeId)
        //                .WithRequired(b => )
        //                .HasForeignKey(s => s.StdId);

        //}
        //{
        //    Listings -> User ID
        //    modelBuilder.Entity<Listing>()
        //            .HasMany(m => m.Users)
        //            .WithRequired(m => m.Conversation)
        //            .HasForeignKey(c => c.ConvoId);

        //    base.OnModelCreating(modelBuilder);
        //}

    }
}
}