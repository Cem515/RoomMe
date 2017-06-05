using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace RoomMe.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
<<<<<<< HEAD
        public bool Landlord { get; set; }
=======
>>>>>>> 0b2439ed0f76acc263bb3459dea4ef119d47c9bb
        [Column(TypeName = "DateTime2")]
        public DateTime DateOfBirth { get; set; }
        public int ZipCode { get; set; }
        public string Phone { get; set; }

    }
}