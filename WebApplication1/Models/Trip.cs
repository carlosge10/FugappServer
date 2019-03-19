using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Trip
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Tel { get; set; }
        public string Event { get; set; }
        public string Msg { get; set; }
        public double Start_long { get; set; }
        public double Start_lat { get; set; }
        public string Token { get; set; }
    }
}