using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Visit
    {
        public string Token { get; set; }
        public string Platform { get; set; }
        public DateTime Visit_date { get; set; }
        public double Visit_long { get; set; }
        public double Visit_lat { get; set; }
    }
}