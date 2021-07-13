using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Controllers
{
    [Route("api/Stocks")]
    [ApiController]
    public class StocksController : ControllerBase
    {
        private readonly StocksContext _context;

        public StocksController(StocksContext context)
        {
            _context = context;
        }

        // GET: api/Stocks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Stocks>>> GetStocks()
        {
            return await _context.Stocks.ToListAsync();
        }

        // GET: api/Stocks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Stocks>> GetStocks(long id)
        {
            var stocks = await _context.Stocks.FindAsync(id);

            if (stocks == null)
            {
                return NotFound();
            }

            return stocks;
        }

        // PUT: api/Stocks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStocks(long id, Stocks stocks)
        {
            if (id != stocks.id)
            {
                return BadRequest();
            }

            _context.Entry(stocks).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StocksExists(id))
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

        // POST: api/Stocks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Stocks>> PostStocks(Stocks stocks)
        {
            _context.Stocks.Add(stocks);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStocks), new { id = stocks.id }, stocks);
        }

        // DELETE: api/Stocks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStocks(long id)
        {
            var stocks = await _context.Stocks.FindAsync(id);
            if (stocks == null)
            {
                return NotFound();
            }

            _context.Stocks.Remove(stocks);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StocksExists(long id)
        {
            return _context.Stocks.Any(e => e.id == id);
        }
    }
}
