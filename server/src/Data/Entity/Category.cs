using System.ComponentModel.DataAnnotations.Schema;

namespace LinuxAppStore_Backend.Data.Entity
{
    [Table("category")]
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; }
    }
}