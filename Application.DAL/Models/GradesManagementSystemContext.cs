using System.Data.Entity;
using Application.DAL.Models.Mapping;

namespace Application.DAL.Models
{
    public partial class GradesManagementSystemContext : DbContext
    {
        static GradesManagementSystemContext()
        {
            Database.SetInitializer<GradesManagementSystemContext>(null);
        }

        public GradesManagementSystemContext()
            : base("Name=GradesManagementSystemContext")
        {
        }

        public DbSet<AspNetRole> AspNetRoles { get; set; }
        public DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }
        public DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }
        public DbSet<AspNetUser> AspNetUsers { get; set; }
        public virtual DbSet<Attendance> Attendances { get; set; }
        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<Grade> Grades { get; set; }
        public virtual DbSet<Department> Departments { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new AspNetRoleMap());
            modelBuilder.Configurations.Add(new AspNetUserClaimMap());
            modelBuilder.Configurations.Add(new AspNetUserLoginMap());
            modelBuilder.Configurations.Add(new AspNetUserMap());
        }
    }
}
