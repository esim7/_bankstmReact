using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bankstm.Data;
using bankstm.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace bankstm.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BankAccountsController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        public BankAccountsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/BankAccounts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BankAccount>>> GetBankAccounts()
        {
            return await _context.BankAccounts.ToListAsync();
        }

        // GET: api/BankAccounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BankAccount>> GetBankAccount(int id)
        {
            var bankAccount = await _context.BankAccounts.FindAsync(id);

            if (bankAccount == null)
            {
                return NotFound();
            }
            return bankAccount;
        }

        // PUT: api/BankAccounts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBankAccount(int id, BankAccount bankAccount)
        {
            if (id != bankAccount.Id)
            {
                return BadRequest();
            }
            _context.Entry(bankAccount).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!BankAccountExists(id))
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

        // POST: api/BankAccounts
        [HttpPost]
        public async Task<ActionResult<BankAccount>> PostBankAccount(BankAccount bankAccount)
        {
            _context.BankAccounts.Add(bankAccount);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBankAccount", new { id = bankAccount.Id }, bankAccount);
        }

        // DELETE: api/BankAccounts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BankAccount>> DeleteBankAccount(int id)
        {
            var bankAccount = await _context.BankAccounts.FindAsync(id);
            if (bankAccount == null)
            {
                return NotFound();
            }
            _context.BankAccounts.Remove(bankAccount);
            await _context.SaveChangesAsync();
            return bankAccount;
        }

        private bool BankAccountExists(int id)
        {
            return _context.BankAccounts.Any(e => e.Id == id);
        }
    }
}
