using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class StocksDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int Value { get; set; }
        public string Ticker { get; set; }
    }
}
