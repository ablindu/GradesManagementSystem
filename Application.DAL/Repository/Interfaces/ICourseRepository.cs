using System.Collections.Generic;
using Application.DAL.Models;

namespace Application.DAL.Repository.Interfaces
{
    public interface ICourseRepository
    {
        IEnumerable<Course> GetCourses();
        IEnumerable<Course> GetCoursesByYear(int year);
    }
}
