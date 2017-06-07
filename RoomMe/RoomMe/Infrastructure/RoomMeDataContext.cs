using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
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

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            {
                //Conversation -> Sent(UserId)
                modelBuilder.Entity<User>()
                        .HasMany(u => u.SentConversations)
                        .WithRequired(c => c.Sent)
                        .HasForeignKey(c => c.SenderID)
                        .WillCascadeOnDelete(false);

                base.OnModelCreating(modelBuilder);
            }
            {
                //Conversation -> Received(UserId)
                modelBuilder.Entity<User>()
                        .HasMany(u => u.GotConversations)
                        .WithRequired(c => c.Got)
                        .HasForeignKey(c => c.RecipientID)
                        .WillCascadeOnDelete(false);

                base.OnModelCreating(modelBuilder);
            }
            {
                //Messages -> Conversation Id
                modelBuilder.Entity<Conversation>()
                        .HasMany(m => m.MessageSent)
                        .WithRequired(c => c.Conversations)
                        .HasForeignKey(c => c.ConvoId)
                        .WillCascadeOnDelete(false);

                base.OnModelCreating(modelBuilder);
            }
            {
                //Bookmarks->Users
                modelBuilder.Entity<User>()
                            .HasMany(s => s.Bookmarked)
                            .WithRequired(b => b.UserProfile)
                            .HasForeignKey(s => s.UserLikeId)
                            .WillCascadeOnDelete(false);

            }
            {
                // Bookmarks -> Listings
                modelBuilder.Entity<Listing>()
                            .HasMany(s => s.Bookmarks)
                            .WithRequired(l => l.LikedListing)
                            .HasForeignKey(s => s.ListingLikeId)
                            .WillCascadeOnDelete(false);

            }
            {
                //    Listings -> User ID

                modelBuilder.Entity<User>()
                        .HasMany(m => m.ListingPosted)
                        .WithRequired(p => p.User)
                        .HasForeignKey(c => c.UserId)
                        .WillCascadeOnDelete(false);

                base.OnModelCreating(modelBuilder);
            }
        }
    }
}
