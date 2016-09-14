using System.Collections.Generic;
using Application.DAL.Models;

namespace Application.DAL.Repository.Interfaces
{
    public interface IAttendanceRepository
    {
        IEnumerable<Attendance> GetAttendancesByCourse(int courseId);
    
    }
}
