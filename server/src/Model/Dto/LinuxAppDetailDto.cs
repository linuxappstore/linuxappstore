namespace LinuxAppStore_Backend.Model.Dto
{
    public class LinuxAppDetailDto
    {
        public string Name { get; set; }

        public LinuxAppModel[] Apps { get; set; }
    }
}