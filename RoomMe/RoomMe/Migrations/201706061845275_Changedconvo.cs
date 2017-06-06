namespace RoomMe.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Changedconvo : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Conversations", "SenderID");
            DropColumn("dbo.Conversations", "RecipientId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Conversations", "RecipientId", c => c.Int(nullable: false));
            AddColumn("dbo.Conversations", "SenderID", c => c.Int(nullable: false));
        }
    }
}
