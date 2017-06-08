namespace RoomMe.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class newdb : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Bookmarks",
                c => new
                    {
                        BookmarkID = c.Int(nullable: false, identity: true),
                        Liked = c.Boolean(nullable: false),
                        UserLikeId = c.Int(nullable: false),
                        ListingLikeId = c.Int(nullable: false),
                        Conversation_ConversationID = c.Int(),
                    })
                .PrimaryKey(t => t.BookmarkID)
                .ForeignKey("dbo.Listings", t => t.ListingLikeId)
                .ForeignKey("dbo.Users", t => t.UserLikeId)
                .ForeignKey("dbo.Conversations", t => t.Conversation_ConversationID)
                .Index(t => t.UserLikeId)
                .Index(t => t.ListingLikeId)
                .Index(t => t.Conversation_ConversationID);
            
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
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ListingID)
                .ForeignKey("dbo.Users", t => t.UserId)
                .Index(t => t.UserId);
            
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
                        Listing_ListingID = c.Int(),
                    })
                .PrimaryKey(t => t.UserId)
                .ForeignKey("dbo.Listings", t => t.Listing_ListingID)
                .Index(t => t.Listing_ListingID);
            
            CreateTable(
                "dbo.Conversations",
                c => new
                    {
                        ConversationID = c.Int(nullable: false, identity: true),
                        SenderID = c.Int(nullable: false),
                        RecipientID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ConversationID)
                .ForeignKey("dbo.Users", t => t.RecipientID)
                .ForeignKey("dbo.Users", t => t.SenderID)
                .Index(t => t.SenderID)
                .Index(t => t.RecipientID);
            
            CreateTable(
                "dbo.Messages",
                c => new
                    {
                        MessageID = c.Int(nullable: false, identity: true),
                        Subject = c.String(),
                        Body = c.String(),
                        DateCreated = c.DateTime(nullable: false),
                        ConvoId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.MessageID)
                .ForeignKey("dbo.Conversations", t => t.ConvoId)
                .Index(t => t.ConvoId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Users", "Listing_ListingID", "dbo.Listings");
            DropForeignKey("dbo.Conversations", "SenderID", "dbo.Users");
            DropForeignKey("dbo.Listings", "UserId", "dbo.Users");
            DropForeignKey("dbo.Conversations", "RecipientID", "dbo.Users");
            DropForeignKey("dbo.Messages", "ConvoId", "dbo.Conversations");
            DropForeignKey("dbo.Bookmarks", "Conversation_ConversationID", "dbo.Conversations");
            DropForeignKey("dbo.Bookmarks", "UserLikeId", "dbo.Users");
            DropForeignKey("dbo.Bookmarks", "ListingLikeId", "dbo.Listings");
            DropIndex("dbo.Messages", new[] { "ConvoId" });
            DropIndex("dbo.Conversations", new[] { "RecipientID" });
            DropIndex("dbo.Conversations", new[] { "SenderID" });
            DropIndex("dbo.Users", new[] { "Listing_ListingID" });
            DropIndex("dbo.Listings", new[] { "UserId" });
            DropIndex("dbo.Bookmarks", new[] { "Conversation_ConversationID" });
            DropIndex("dbo.Bookmarks", new[] { "ListingLikeId" });
            DropIndex("dbo.Bookmarks", new[] { "UserLikeId" });
            DropTable("dbo.Messages");
            DropTable("dbo.Conversations");
            DropTable("dbo.Users");
            DropTable("dbo.Listings");
            DropTable("dbo.Bookmarks");
        }
    }
}
