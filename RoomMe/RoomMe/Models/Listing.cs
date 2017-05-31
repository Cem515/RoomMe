using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RoomMe.Models
{
    public class Listing
    {

        [Key]
        public int ListingID { get; set; }

        public string Description { get; set; }
        public int Price { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zipcode { get; set; }
        public string Picture { get; set; }

        public User User { get; set; }


    }
}