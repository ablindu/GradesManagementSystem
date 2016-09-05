using System.Data.Entity;
using System.Data.Entity.Infrastructure;
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

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new AspNetRoleMap());
            modelBuilder.Configurations.Add(new AspNetUserClaimMap());
            modelBuilder.Configurations.Add(new AspNetUserLoginMap());
            modelBuilder.Configurations.Add(new AspNetUserMap());
        }
    }
}
