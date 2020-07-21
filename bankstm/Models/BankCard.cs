using System;

namespace bankstm.Models
{
    public class BankCard
    {
        public int Id { get; set; }
        public string Number { get; set; }
        public DateTime ValidPeriod { get; set; }
        public string CardHolder { get; set; }
        public int CvvCode { get; set; }
        public int Amount { get; set; }
        //public int? BankAccountId { get; set; }
        public BankAccount BankAccount { get; set; }

        public BankCard()
        {
            Random rand = new Random();

            ValidPeriod = DateTime.Now.AddYears(3);
            Number = "5526 " + rand.Next(1000, 9999).ToString() + " " + rand.Next(1000, 9999).ToString() + " " + rand.Next(1000, 9999).ToString();
            CvvCode = rand.Next(100, 999);
            Amount = 0;
        }
    }
}