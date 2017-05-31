using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RoomMe.Models
{
    public class ListingSearch
    {
        public int? MinPrice { get; set; }
        public int ?MaxPrice { get; set; }
        public int? ZipCode { get; set; }
        public string City { get; set; }

    }
}