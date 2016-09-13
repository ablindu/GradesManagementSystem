namespace Application.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovedCourseListFromCourseTable : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Courses", "Course_Id", "dbo.Courses");
            DropIndex("dbo.Courses", new[] { "Course_Id" });
            AddColumn("dbo.Attendances", "HasAtended", c => c.Boolean(nullable: false));
            DropColumn("dbo.Attendances", "AttendanceValue");
            DropColumn("dbo.Courses", "Course_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Courses", "Course_Id", c => c.Int());
            AddColumn("dbo.Attendances", "AttendanceValue", c => c.Boolean(nullable: false));
            DropColumn("dbo.Attendances", "HasAtended");
            CreateIndex("dbo.Courses", "Course_Id");
            AddForeignKey("dbo.Courses", "Course_Id", "dbo.Courses", "Id");
        }
    }
}
