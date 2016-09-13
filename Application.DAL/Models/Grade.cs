using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Application.DAL.Models
{
   public class Grade
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("AspNetUser")]
        public string UserId { get; set; }
        [ForeignKey("Course")]
        public int CourseId { get; set; }
        [Range(1, 10, ErrorMessage = "Grade must be between {1} and {2}.")]
        public int GradeValue { get; set; }
        [Range(1, 14, ErrorMessage = "WeekNumber must be between {1} and {2}.")]
        public int WeekNumber { get; set; }

        public virtual Course Course { get; set; }
        public virtual AspNetUser AspNetUser { get; set; }
    }
}