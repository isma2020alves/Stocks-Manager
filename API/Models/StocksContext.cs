using Microsoft.EntityFrameworkCore;

namespace API.Models
{

    /// <summary>
    /// Summary description for Class1
    /// </summary>
    public class StocksContext : DbContext
    {
        public StocksContext(DbContextOptions<StocksContext> options)
            : base(options)
        {
        }

        public DbSet<Stocks> Stocks { get; set; }
    }
}