using Microsoft.Extensions.DependencyInjection;

namespace bankstm.Models
{
    public class Service
    {
        public int Id { get; set; }
        public ServiceProvider ServiceProvider { get; set; }
        public BankCard BankCard { get; set; }
        public int Amount { get; set; }
        public string Description { get; set; }
    }
}