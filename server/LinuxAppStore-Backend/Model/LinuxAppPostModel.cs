namespace LinuxAppStore_Backend.Model
{
    public class LinuxAppPostModel
    {
        public string ApiKey { get; set; }

        public LinuxAppModel[] Apps { get; set; }
    }
}