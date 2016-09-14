using System.Collections.Generic;
using System.Linq;
using Application.DAL.Models;

namespace Application.DAL.Repository
{
    public class AttendanceRepository
    {
        private readonly GradesManagementSystemContext _context = new GradesManagementSystemContext();

        public IEnumerable<Attendance> GetAttendancesByCourse(int courseId)
        {
            var result = _context.Attendances.Where(a => a.CourseId == courseId);
            return result;
        } 


    }
}
