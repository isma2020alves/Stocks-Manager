namespace API.Models
{
    /// <summary>
    /// Summary description for Class Stocks
    /// </summary>
    public class Stocks
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public decimal Value { get; set; }
        public string Ticker { get; set; }
    }
}