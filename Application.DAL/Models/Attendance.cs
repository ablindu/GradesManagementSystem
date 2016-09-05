using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public bool AttendanceValue { get; set; }
        public int WeekNumber { get; set; }

        public virtual Course Course { get; set; }
        public virtual AspNetUser AspNetUser { get; set; }


    }
}
