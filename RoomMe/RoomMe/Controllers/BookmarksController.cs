using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using RoomMe.Infrastructure;
using RoomMe.Models;

namespace RoomMe.Controllers
{
    public class BookmarksController : ApiController
    {
        private RoomMeDataContext db = new RoomMeDataContext();

        // GET: api/Bookmarks
        public IQueryable<Bookmark> GetBookmarks()
        {
            return db.Bookmarks;
        }

        // GET: api/Bookmarks/5
        [ResponseType(typeof(Bookmark))]
        public IHttpActionResult GetBookmark(int id)
        {
            Bookmark bookmark = db.Bookmarks.Find(id);
            if (bookmark == null)
            {
                return NotFound();
            }

            return Ok(bookmark);
        }

        // PUT: api/Bookmarks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBookmark(int id, Bookmark bookmark)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bookmark.BookmarkID)
            {
                return BadRequest();
            }

            db.Entry(bookmark).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookmarkExists(id))
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

        // POST: api/Bookmarks
        [ResponseType(typeof(Bookmark))]
        public IHttpActionResult PostBookmark(Bookmark bookmark)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Bookmarks.Add(bookmark);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = bookmark.BookmarkID }, bookmark);
        }

        // DELETE: api/Bookmarks/5
        [ResponseType(typeof(Bookmark))]
        public IHttpActionResult DeleteBookmark(int id)
        {
            Bookmark bookmark = db.Bookmarks.Find(id);
            if (bookmark == null)
            {
                return NotFound();
            }

            db.Bookmarks.Remove(bookmark);
            db.SaveChanges();

            return Ok(bookmark);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookmarkExists(int id)
        {
            return db.Bookmarks.Count(e => e.BookmarkID == id) > 0;
        }
    }
}