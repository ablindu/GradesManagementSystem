using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Application.DAL.Models;
using Application.DAL.Repository.Interfaces;

namespace Server.WebApi.Controllers
{
    [Authorize]
    [RoutePrefix("api/Course")]
    [EnableCors("http://localhost:3001", "*", "*")]
    public class CourseController : ApiController
    {
        private readonly ICourseRepository _courseRepository;


        public CourseController(ICourseRepository courseRepository)
        {
            this._courseRepository = courseRepository;
        }

         //  [EnableQuery]
        [ResponseType(typeof(Course))]
        public IHttpActionResult GetCourses()
        {
            try
            {
                return Ok(_courseRepository.GetCourses().ToList());
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [ResponseType(typeof(Course))]
        public IHttpActionResult GetCourseForYear(int year)
        {
            try
            {
                return Ok(_courseRepository.GetCoursesByYear(year).ToList());
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }
    }
}
