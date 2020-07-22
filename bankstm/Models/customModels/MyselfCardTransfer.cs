namespace bankstm.Models.customModels
{
    public class MyselfCardTransfer
    {
        public int Id { get; set; }
        public int CardIdFrom { get; set; }
        public int CardIdTo { get; set; }
        public int Sum { get; set; }
    }
}