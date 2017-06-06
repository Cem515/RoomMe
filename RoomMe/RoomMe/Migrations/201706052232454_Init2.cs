namespace RoomMe.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Init2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Listings", "User_UserId", "dbo.Users");
            DropIndex("dbo.Listings", new[] { "User_UserId" });
            RenameColumn(table: "dbo.Listings", name: "User_UserId", newName: "UserID");
            AlterColumn("dbo.Listings", "UserID", c => c.Int(nullable: false));
            CreateIndex("dbo.Listings", "UserID");
            AddForeignKey("dbo.Listings", "UserID", "dbo.Users", "UserId", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Listings", "UserID", "dbo.Users");
            DropIndex("dbo.Listings", new[] { "UserID" });
            AlterColumn("dbo.Listings", "UserID", c => c.Int());
            RenameColumn(table: "dbo.Listings", name: "UserID", newName: "User_UserId");
            CreateIndex("dbo.Listings", "User_UserId");
            AddForeignKey("dbo.Listings", "User_UserId", "dbo.Users", "UserId");
        }
    }
}
