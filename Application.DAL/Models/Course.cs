using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Application.DAL.Models
{
    public class Course
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        [Range(1, 6, ErrorMessage = "Year must be between {1} and {2}.")]
        public int Year { get; set; }
        [Range(1, 2, ErrorMessage = "Semester must be between {1} and {2}.")]
        public int Semester { get; set; }
        [ForeignKey("Department")]
        public int DepartmentId { get; set; }

        public virtual Department Department { get; set; }
    }
}
