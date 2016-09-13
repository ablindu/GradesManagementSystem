using System.Collections.Generic;
using System.Linq;
using Application.DAL.Models;
using Application.DAL.Repository.Interfaces;

namespace Application.DAL.Repository
{
    public class CourseRepository : ICourseRepository
    {
        private static readonly GradesManagementSystemContext _context = new GradesManagementSystemContext();

        public IEnumerable<Course> GetCourses()
        {
            var result = _context.Courses;
            return result;
        }
        public IEnumerable<Course> GetCoursesByYear(int year)
        {
            var result = _context.Courses.Where(c => c.Year == year);
            return result;
        }
      
    }
}
