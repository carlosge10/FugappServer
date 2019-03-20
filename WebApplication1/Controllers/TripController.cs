using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class TripController : ApiController
    {
       [HttpGet]
        public string[] Get(long id)
        {
            return new string[]
            {
                "Hello",
                "World",
                id+""
            };
        }
        [HttpPost]
        public HttpResponseMessage Post(Trip t)
        {
            try
            {
                bool correct = Trip.saveTrip(t);
                var response = Request.CreateResponse(System.Net.HttpStatusCode.Created, t);
                return response;
            }
            catch (Exception e) {
                var response = Request.CreateErrorResponse(System.Net.HttpStatusCode.InternalServerError, e);
                return response;
            } 
        }
    }
}
