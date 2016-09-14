using System.Collections.Generic;
using System.Linq;
using Application.DAL.Models;
using Application.DAL.Repository.Interfaces;

namespace Application.DAL.Repository
{
    class GradesRepository: IGradesRepository
    {
        private static readonly GradesManagementSystemContext _context = new GradesManagementSystemContext ();

        public IEnumerable<Grade> GetGradesByCourse(int courseId, string userId)
        {
            return _context.Grades.Where(g=> g.CourseId == courseId && g.UserId == userId);
        }
       
    }
}
