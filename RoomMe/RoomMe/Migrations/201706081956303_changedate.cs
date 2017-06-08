namespace RoomMe.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changedate : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Messages", "DateCreated", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Messages", "DateCreated", c => c.DateTime(nullable: false));
        }
    }
}
