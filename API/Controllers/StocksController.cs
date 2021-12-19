﻿using System.Collections.Generic;
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
        [HttpGet("{ID}")]
        public async Task<ActionResult<StocksDTO>> GetStocks(long ID)
        {
            var stocks = await _context.Stocks.FindAsync(ID);

            if (stocks == null)
            {
                return NotFound();
            }

            return StocksToDTO(stocks);
        }

        // PUT: api/Stocks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{ID}")]
        public async Task<IActionResult> PutStocks(long ID, StocksDTO stocksDTO)
        {
            if (ID != stocksDTO.ID)
            {
                return BadRequest();
            }

            var stocks = await _context.Stocks.FindAsync(ID);
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
            catch (DbUpdateConcurrencyException) when (!StocksExists(ID))
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
                ID = stocksDTO.ID,
                Name = stocksDTO.Name,
                Value = stocksDTO.Value,
                Ticker = stocksDTO.Ticker
            };

            _context.Stocks.Add(stocks);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStocks), new { ID = stocks.ID }, StocksToDTO(stocks));
        }

        // DELETE: api/Stocks/5
        [HttpDelete("{ID}")]
        public async Task<IActionResult> DeleteStocks(long ID)
        {
            var stocks = await _context.Stocks.FindAsync(ID);
            if (stocks == null)
            {
                return NotFound();
            }

            _context.Stocks.Remove(stocks);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StocksExists(long ID)
        {
            return _context.Stocks.Any(e => e.ID == ID);
        }

        private static StocksDTO StocksToDTO(Stocks stocks) =>
            new StocksDTO
            {
                ID = stocks.ID,
                Name = stocks.Name,
                Value = stocks.Value,
                Ticker = stocks.Ticker
            };
    }
}
