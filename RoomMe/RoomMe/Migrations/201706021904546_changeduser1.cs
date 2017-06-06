namespace RoomMe.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeduser1 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Users", "Phone", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Users", "Phone", c => c.Int(nullable: false));
        }
    }
}
