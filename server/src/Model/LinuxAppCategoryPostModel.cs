namespace LinuxAppStore_Backend.Model
{
    public class LinuxAppCategoryPostModel
    {
        public string ApiKey { get; set; }

        public int Type { get; set; }

        public LinuxAppCategoryModel[] Categories { get; set; }
    }
}