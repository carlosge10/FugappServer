using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
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

        public static bool saveTrip(Trip t) {
            try
            {
                using (SqlConnection openCon = new SqlConnection(ConfigurationManager.ConnectionStrings["SQLServerConnectionString"].ConnectionString))
                {
                    string save = "INSERT INTO Trip (Token, Name, Tel, Event, Msg, Lat, Long) VALUES (@Token, @Name, @Tel, @Event, @Msg, @Lat, @Long)";

                    using (SqlCommand querySaveStaff = new SqlCommand(save))
                    {
                        querySaveStaff.Connection = openCon;
                        querySaveStaff.Parameters.AddWithValue("@Name", t.Name);
                        querySaveStaff.Parameters.AddWithValue("@Token", t.Token);
                        querySaveStaff.Parameters.AddWithValue("@Tel", t.Tel);
                        querySaveStaff.Parameters.AddWithValue("@Event", t.Event);
                        querySaveStaff.Parameters.AddWithValue("@Msg", t.Msg);
                        querySaveStaff.Parameters.AddWithValue("@Lat", t.Start_lat);
                        querySaveStaff.Parameters.AddWithValue("@Long", t.Start_long);
                        openCon.Open();
                        int res = querySaveStaff.ExecuteNonQuery();
                        openCon.Close();
                        return res >= 0;
                    }
                }
            }
            catch (Exception e) {
                return false;
            }
        }
    }
}