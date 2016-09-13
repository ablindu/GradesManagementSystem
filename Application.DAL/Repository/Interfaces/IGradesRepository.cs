using System.Collections.Generic;
using Application.DAL.Models;
namespace Application.DAL.Repository.Interfaces
{
    public interface IGradesRepository
    {
        IEnumerable<Grade> GetGrades();
    }
}