using System.ComponentModel.DataAnnotations.Schema;

namespace LinuxAppStore_Backend.Data.Entity
{
    [Table("linux_app_category")]
    public class LinuxAppCategory
    {
        public int LinuxAppId { get; set; }

        public int CategoryId { get; set; }

        public LinuxApp LinuxApp { get; set; }

        public Category Category { get; set; }
    }
}