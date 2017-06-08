namespace RoomMe.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class removeddate : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Messages", "DateCreated");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Messages", "DateCreated", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
        }
    }
}
