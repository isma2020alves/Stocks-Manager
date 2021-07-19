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
        public async Task<ActionResult<IEnumerable<StocksDTO>>> GetStocks()
        {
            return await _context.Stocks
                .Select(x => StocksToDTO(x))
                .ToListAsync();
        }

        // GET: api/Stocks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StocksDTO>> GetStocks(long id)
        {
            var stocks = await _context.Stocks.FindAsync(id);

            if (stocks == null)
            {
                return NotFound();
            }

            return StocksToDTO(stocks);
        }

        // PUT: api/Stocks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStocks(long id, StocksDTO stocksDTO)
        {
            if (id != stocksDTO.Id)
            {
                return BadRequest();
            }

            var stocks = await _context.Stocks.FindAsync(id);
            if (stocks == null)
            {
                return NotFound();
            }

            stocks.Name = stocksDTO.Name;
            stocks.Value = stocksDTO.Value;
            stocks.Ticker = stocksDTO.Ticker;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!StocksExists(id))
            {
               return NotFound();
            }

            return NoContent();
        }

        // POST: api/Stocks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StocksDTO>> CreateStock(StocksDTO stocksDTO)
        {
            var stocks = new Stocks
            {
                Id = stocksDTO.Id,
                Name = stocksDTO.Name,
                Value = stocksDTO.Value,
                Ticker = stocksDTO.Ticker
            };

            _context.Stocks.Add(stocks);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStocks), new { id = stocks.Id }, StocksToDTO(stocks));
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
            return _context.Stocks.Any(e => e.Id == id);
        }

        private static StocksDTO StocksToDTO(Stocks stocks) =>
            new StocksDTO
            {
                Id = stocks.Id,
                Name = stocks.Name,
                Value = stocks.Value,
                Ticker = stocks.Ticker
            };
    }
}
