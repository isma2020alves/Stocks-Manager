﻿namespace API.Models
{
    /// <summary>
    /// Summary description for Class Stocks
    /// </summary>
    public class Stocks
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int Value { get; set; }
        public string Ticker { get; set; }
        public string Secret { get; set; }
    }
}