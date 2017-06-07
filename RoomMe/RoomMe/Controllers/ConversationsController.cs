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
    public class ConversationsController : ApiController
    {
        private RoomMeDataContext db = new RoomMeDataContext();

        // GET: api/Conversations
        //public IQueryable<Conversation> GetConversations()
        //{
        //    return db.Conversations;
        //}

        // GET: api/Conversations/5
        //[ResponseType(typeof(Conversation))]
        //public IHttpActionResult GetConversation(int id)
        //{
        //    Conversation conversation = db.Conversations.Find(id);
        //    if (conversation == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(conversation);
        //}

        // PUT: api/Conversations/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutConversation(int id, Conversation conversation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != conversation.ConversationID)
            {
                return BadRequest();
            }

            db.Entry(conversation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConversationExists(id))
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

        // POST: api/Conversations
        [ResponseType(typeof(Conversation))]
        public IHttpActionResult PostConversation(Conversation conversation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Conversations.Add(conversation);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = conversation.ConversationID }, conversation);
        }

        // DELETE: api/Conversations/5
        [ResponseType(typeof(Conversation))]
        public IHttpActionResult DeleteConversation(int id)
        {
            Conversation conversation = db.Conversations.Find(id);
            if (conversation == null)
            {
                return NotFound();
            }

            db.Conversations.Remove(conversation);
            db.SaveChanges();

            return Ok(conversation);
        }
        //ConversationSearch
        [HttpGet]
        [Route("api/Conversations/ConvoSearch")]
        public IQueryable<Conversation> ConvoSearch([FromUri] Conversation check)
        {
            IQueryable<Conversation> cdb = db.Conversations;

           // cdb = cdb.Where(c => c.SenderID == check.SenderID && c.RecipientID == check.RecipientID || c.SenderID == check.RecipientID && c.RecipientID == check.SenderID);

            var cons = from c in cdb
                       where (c.SenderID == check.SenderID && c.RecipientID == check.RecipientID || c.SenderID == check.RecipientID && c.RecipientID == check.SenderID)
                       select c;
            return (cons);

        }

        //[HttpPost]
        //[Route("api/Conversations/NewConversation")]
        //public IQueryable<Conversation> NewConversation ([FromUri]Conversation post)
        //{
        //    IQueryable<Conversation> pdb = db.Conversations
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ConversationExists(int id)
        {
            return db.Conversations.Count(e => e.ConversationID == id) > 0;
        }
    }
}