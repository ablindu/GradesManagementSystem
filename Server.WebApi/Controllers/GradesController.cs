using System;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.Http.OData;
using Application.DAL.Models;
using Application.DAL.Repository.Interfaces;

namespace Server.WebApi.Controllers
{
    [Authorize]
    [RoutePrefix("api/Grades")]
    [EnableCors("http://localhost:3001", "*", "*")]
    public class GradesController : ApiController
    {
        private readonly IGradesRepository _gradesRepository;

        [Authorize]
        [EnableQuery]
        [ResponseType(typeof(Grade))]
        public IHttpActionResult GetGradesForCourse(int courseid, string userId)
        {
            try
            {
                return Ok(_gradesRepository.GetGradesByCourse(courseid, userId));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        
/*
        // POST: api/Products
        [Authorize]
        [ResponseType(typeof(Product))]
        public IHttpActionResult PostItem([FromBody]Product product)
        {
            try
            {
                if (product == null)
                {
                    return BadRequest("Product cannot be null!");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var newProduct = _productRepository.Save(product);
                if (newProduct == null)
                {
                    return Conflict();
                }
                return Created(Request.RequestUri + newProduct.ProductId.ToString(), newProduct);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

        }

        // PUT: api/Products/5
        [Authorize]
        [ResponseType(typeof(Product))]
        public IHttpActionResult Put(int id, [FromBody] Product product)
        {
            try
            {
                if (product == null)
                {
                    return BadRequest("Product cannot be null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var updatedProduct = _productRepository.Save(id, product);
                if (updatedProduct == null)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
            /* var msg = new HttpResponseMessage(HttpStatusCode.Unauthorized) { ReasonPhrase = "Oops!!!" };
             throw new HttpResponseException(msg);#1#
        }

        // DELETE: api/Products/5
        public void Delete(int id)
        {
        }*/
    }
}