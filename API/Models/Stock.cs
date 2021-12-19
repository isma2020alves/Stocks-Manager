using System;
using System.Collections.Generic;

#nullable disable

namespace API
{
    public partial class Stock
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }
        public string Ticker { get; set; }
    }
}
