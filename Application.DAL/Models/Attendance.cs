using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Application.DAL.Models
{
    public class Attendance
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("AspNetUser")]
        public string UserId { get; set; }
        [ForeignKey("Course")]
        public int CourseId { get; set; }
        public bool HasAtended { get; set; }
        [Range(1, 14, ErrorMessage = "WeekNumber must be between {1} and {2}.")]
        public int WeekNumber { get; set; }

        public virtual Course Course { get; set; }
        public virtual AspNetUser AspNetUser { get; set; }
    }
}
