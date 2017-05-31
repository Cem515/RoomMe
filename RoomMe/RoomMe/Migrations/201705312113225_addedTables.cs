namespace RoomMe.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedTables : DbMigration
    {
        public override void Up()
        {
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
                        Zipcode = c.String(),
                        Picture = c.String(),
                        User_UserId = c.Int(),
                    })
                .PrimaryKey(t => t.ListingID)
                .ForeignKey("dbo.Users", t => t.User_UserId)
                .Index(t => t.User_UserId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserId = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Email = c.String(),
                        Landlord = c.Boolean(nullable: false),
                        DateOfBirth = c.DateTime(nullable: false),
                        ZipCode = c.Int(nullable: false),
                        Phone = c.Int(nullable: false),
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
            DropForeignKey("dbo.Listings", "User_UserId", "dbo.Users");
            DropIndex("dbo.Conversations", new[] { "Sender_UserId" });
            DropIndex("dbo.Conversations", new[] { "Recipient_UserId" });
            DropIndex("dbo.Messages", new[] { "Conversation_ConversationID" });
            DropIndex("dbo.Listings", new[] { "User_UserId" });
            DropTable("dbo.Conversations");
            DropTable("dbo.Messages");
            DropTable("dbo.Users");
            DropTable("dbo.Listings");
        }
    }
}
