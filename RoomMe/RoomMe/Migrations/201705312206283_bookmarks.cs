namespace RoomMe.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class bookmarks : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Bookmarks",
                c => new
                    {
                        BookmarkID = c.Int(nullable: false, identity: true),
                        Liked = c.Boolean(nullable: false),
                        Listing_ListingID = c.Int(),
                        User_UserId = c.Int(),
                    })
                .PrimaryKey(t => t.BookmarkID)
                .ForeignKey("dbo.Listings", t => t.Listing_ListingID)
                .ForeignKey("dbo.Users", t => t.User_UserId)
                .Index(t => t.Listing_ListingID)
                .Index(t => t.User_UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Bookmarks", "User_UserId", "dbo.Users");
            DropForeignKey("dbo.Bookmarks", "Listing_ListingID", "dbo.Listings");
            DropIndex("dbo.Bookmarks", new[] { "User_UserId" });
            DropIndex("dbo.Bookmarks", new[] { "Listing_ListingID" });
            DropTable("dbo.Bookmarks");
        }
    }
}
