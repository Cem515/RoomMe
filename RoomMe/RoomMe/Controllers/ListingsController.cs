using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using RoomMe.Infrastructure;
using RoomMe.Models;

namespace RoomMe.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ListingsController : ApiController
    {
        private RoomMeDataContext db = new RoomMeDataContext();

        // GET: api/Listings
        public IQueryable<Listing> GetListings()
        {
            return db.Listings;
        }

        // GET: api/Listings/5
        [ResponseType(typeof(Listing))]
        public IHttpActionResult GetListing(int id)
        {
            Listing listing = db.Listings.Find(id);
            if (listing == null)
            {
                return NotFound();
            }

            return Ok(listing);
        }

        // PUT: api/Listings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutListing(int id, Listing listing)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != listing.ListingID)
            {
                return BadRequest();
            }

            db.Entry(listing).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Listings
        [ResponseType(typeof(Listing))]
        public IHttpActionResult PostListing(Listing listing)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Listings.Add(listing);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = listing.ListingID }, listing);
        }

        // DELETE: api/Listings/5
        [ResponseType(typeof(Listing))]
        public IHttpActionResult DeleteListing(int id)
        {
            Listing listing = db.Listings.Find(id);
            if (listing == null)
            {
                return NotFound();
            }

            db.Listings.Remove(listing);
            db.SaveChanges();

            return Ok(listing);
        }

        // ListingSearch
        [HttpGet]
        [Route("api/Listings/ListingSearch")]
        public IQueryable<Listing> ListingSearch([FromUri] ListingSearch search)
        {
            IQueryable<Listing> fl = db.Listings;

           if(search.City != null)
            {
                fl = fl.Where(l => l.City == search.City);
            }
           if(search.MinPrice != null)
            {
                fl = fl.Where(l => l.Price >= search.MinPrice);
            }
           if(search.MaxPrice != null)
            {
                fl = fl.Where(l => l.Price <= search.MinPrice);
            }
           if(search.ZipCode != null)
            {
                fl = fl.Where(l => l.Zipcode == search.ZipCode);
            }
            return (fl);
        }

        //UserListing Search
        [HttpGet]
        [Route("api/Listings/UserListings")]
        public IQueryable<Listing> UserListingSearch([FromUri] int userId)
        {
            IQueryable<Listing> usl = db.Listings;
            usl = usl.Where(u => u.UserId == userId);
            return (usl);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ListingExists(int id)
        {
            return db.Listings.Count(e => e.ListingID == id) > 0;
        }
    }
}