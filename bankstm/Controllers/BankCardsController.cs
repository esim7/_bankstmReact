using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bankstm.Data;
using bankstm.Models;
using bankstm.Models.customModels;
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
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<BankCard>>> GetBankCards(int id)
        {
            var account = await _context.BankAccounts.Include(u=>u.User).FirstOrDefaultAsync(a => a.Id == id);
            var cards = _context.BankCards.Where(c => c.BankAccount == account);
            return await cards.ToListAsync();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BankCard>>> GetBankCard()
        {
            var userId = HttpContext.User.Claims.ElementAt(5).Value;
            var allCards = await _context.BankCards.Include(x => x.BankAccount).Where(c => c.BankAccount.User.Id != userId).ToListAsync();

            if (allCards == null)
            {
                return NotFound();
            }
            return allCards;
        }

        // PUT: api/BankCards/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBankCard(int id, BankCard bankCard)
        {
            if (id != bankCard.Id)
            {
                return BadRequest();
            }

            var editableCard = _context.BankCards.Include(b=>b.BankAccount).First(c => c.Id == id);
            editableCard.Amount += bankCard.Amount;
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
            return Ok(editableCard);
        }

        [HttpPut]
        public async Task<IActionResult> PutBankCard([FromBody]MyselfCardTransfer myselfCardTransfer)
        {
            var fromTransferCard = _context.BankCards.Include(a => a.BankAccount)
                .First(c => c.Id == myselfCardTransfer.CardIdFrom);

            var toTransferCard = _context.BankCards.Include(a => a.BankAccount)
                .First(c => c.Id == myselfCardTransfer.CardIdTo);

            if (fromTransferCard.Amount < myselfCardTransfer.Sum)
            {
                return BadRequest();
            }

            fromTransferCard.Amount -= myselfCardTransfer.Sum;
            toTransferCard.Amount += myselfCardTransfer.Sum;

            await _context.SaveChangesAsync();

            return Ok(toTransferCard);
        }


        // POST: api/BankCards
        [HttpPost("{id}")]
        public async Task<ActionResult<BankCard>> PostBankCard(int id, BankCard bankCard)
        {
            var account = await _context.BankAccounts.Include(u=>u.User).FirstOrDefaultAsync(a => a.Id == id);
            bankCard.BankAccount = account;
            bankCard.CardHolder = account.User.FirstName + " " + account.User.LastName;
            var createdCard = _context.BankCards.Add(bankCard);
            await _context.SaveChangesAsync();
            return createdCard.Entity;
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
