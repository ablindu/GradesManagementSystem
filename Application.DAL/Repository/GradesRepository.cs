using System.Collections.Generic;
using Application.DAL.Models;
using Application.DAL.Repository.Interfaces;

namespace Application.DAL.Repository
{
    class GradesRepository: IGradesRepository
    {
        private static readonly GradesManagementSystemContext _context = new GradesManagementSystemContext ();

        public IEnumerable<Grade> GetGrades()
        {
            return _context.Grades;
        }
       
    }
}
