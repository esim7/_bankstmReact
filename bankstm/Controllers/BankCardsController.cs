using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bankstm.Data;
using bankstm.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace bankstm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BankCardsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BankCardsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/BankCards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BankCard>>> GetBankCards()
        {
            return await _context.BankCards.ToListAsync();
        }

        // GET: api/BankCards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BankCard>> GetBankCard(int id)
        {
            var bankCard = await _context.BankCards.FindAsync(id);

            if (bankCard == null)
            {
                return NotFound();
            }
            return bankCard;
        }
        // PUT: api/BankCards/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBankCard(int id, BankCard bankCard)
        {
            if (id != bankCard.Id)
            {
                return BadRequest();
            }
            _context.Entry(bankCard).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BankCardExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        // POST: api/BankCards
        [HttpPost]
        public async Task<ActionResult<BankCard>> PostBankCard(BankCard bankCard)
        {
            _context.BankCards.Add(bankCard);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetBankCard", new { id = bankCard.Id }, bankCard);
        }

        // DELETE: api/BankCards/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BankCard>> DeleteBankCard(int id)
        {
            var bankCard = await _context.BankCards.FindAsync(id);
            if (bankCard == null)
            {
                return NotFound();
            }
            _context.BankCards.Remove(bankCard);
            await _context.SaveChangesAsync();
            return bankCard;
        }

        private bool BankCardExists(int id)
        {
            return _context.BankCards.Any(e => e.Id == id);
        }
    }
}
