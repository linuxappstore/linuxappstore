using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LinuxAppStore_Backend.Model
{
    public class LinuxAppModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Type { get; set; }

        public DateTime DateAdded { get; set; }

        public DateTime LastUpdated { get; set; }

        public string Src { get; set; }

        public string Icon { get; set; }

        public string CurrentVersion { get; set; }

        public string Identifier { get; set; }

        public string Summary { get; set; }

        public LinuxAppCategoryModel[] LinuxAppCategorys { get; set; }
    }
}
