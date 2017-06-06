namespace RoomMe.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Init1 : DbMigration
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
            
            CreateTable(
                "dbo.Listings",
                c => new
                    {
                        ListingID = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                        Price = c.Int(nullable: false),
                        Address = c.String(),
                        City = c.String(),
                        State = c.String(),
                        Zipcode = c.Int(nullable: false),
                        Picture = c.String(),
                        UserID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ListingID)
                .ForeignKey("dbo.Users", t => t.UserID, cascadeDelete: true)
                .Index(t => t.UserID);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserId = c.Int(nullable: false, identity: true),
                        UserName = c.String(),
                        Password = c.String(),
                        Email = c.String(),
                        Landlord = c.Boolean(nullable: false),
                        DateOfBirth = c.DateTime(nullable: false, precision: 7, storeType: "datetime2"),
                        ZipCode = c.Int(nullable: false),
                        Phone = c.String(),
                    })
                .PrimaryKey(t => t.UserId);
            
            CreateTable(
                "dbo.Messages",
                c => new
                    {
                        MessageID = c.Int(nullable: false, identity: true),
                        Subject = c.String(),
                        Body = c.String(),
                        DateCreated = c.DateTime(nullable: false),
                        Conversation_ConversationID = c.Int(),
                    })
                .PrimaryKey(t => t.MessageID)
                .ForeignKey("dbo.Conversations", t => t.Conversation_ConversationID)
                .Index(t => t.Conversation_ConversationID);
            
            CreateTable(
                "dbo.Conversations",
                c => new
                    {
                        ConversationID = c.Int(nullable: false, identity: true),
                        Recipient_UserId = c.Int(),
                        Sender_UserId = c.Int(),
                    })
                .PrimaryKey(t => t.ConversationID)
                .ForeignKey("dbo.Users", t => t.Recipient_UserId)
                .ForeignKey("dbo.Users", t => t.Sender_UserId)
                .Index(t => t.Recipient_UserId)
                .Index(t => t.Sender_UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Messages", "Conversation_ConversationID", "dbo.Conversations");
            DropForeignKey("dbo.Conversations", "Sender_UserId", "dbo.Users");
            DropForeignKey("dbo.Conversations", "Recipient_UserId", "dbo.Users");
            DropForeignKey("dbo.Bookmarks", "User_UserId", "dbo.Users");
            DropForeignKey("dbo.Bookmarks", "Listing_ListingID", "dbo.Listings");
            DropForeignKey("dbo.Listings", "UserID", "dbo.Users");
            DropIndex("dbo.Conversations", new[] { "Sender_UserId" });
            DropIndex("dbo.Conversations", new[] { "Recipient_UserId" });
            DropIndex("dbo.Messages", new[] { "Conversation_ConversationID" });
            DropIndex("dbo.Listings", new[] { "UserID" });
            DropIndex("dbo.Bookmarks", new[] { "User_UserId" });
            DropIndex("dbo.Bookmarks", new[] { "Listing_ListingID" });
            DropTable("dbo.Conversations");
            DropTable("dbo.Messages");
            DropTable("dbo.Users");
            DropTable("dbo.Listings");
            DropTable("dbo.Bookmarks");
        }
    }
}
