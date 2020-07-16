using System;
using System.Collections.Generic;

namespace bankstm.Models
{
    public class BankAccount
    {
        public int Id { get; set; }
        public string Number { get; set; }
        public ApplicationUser User { get; set; }
        public DateTime ValidPeriod { get; set; }
        public IEnumerable<BankCard> BankCards { get; set; }
    }
}