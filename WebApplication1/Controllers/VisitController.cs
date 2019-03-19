using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class VisitController : ApiController
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
        public HttpResponseMessage Post(Visit v)
        {
            var response = Request.CreateResponse(System.Net.HttpStatusCode.Created, v);
            return response;
        }
    }
}
