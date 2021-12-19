﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class StocksDTO
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public decimal Value { get; set; }
        public string Ticker { get; set; }
    }
}
