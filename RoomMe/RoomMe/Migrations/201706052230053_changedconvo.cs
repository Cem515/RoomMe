namespace RoomMe.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changedconvo : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Conversations", "SenderID", c => c.Int(nullable: false));
            AddColumn("dbo.Conversations", "RecipientId", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Conversations", "RecipientId");
            DropColumn("dbo.Conversations", "SenderID");
        }
    }
}
