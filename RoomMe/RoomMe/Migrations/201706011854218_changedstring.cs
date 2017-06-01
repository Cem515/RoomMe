namespace RoomMe.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changedstring : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Listings", "Zipcode", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Listings", "Zipcode", c => c.String());
        }
    }
}
