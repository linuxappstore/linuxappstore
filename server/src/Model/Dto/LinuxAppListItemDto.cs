namespace LinuxAppStore_Backend.Model.Dto
{
    public class LinuxAppListItemDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Type { get; set; }

        public string Src { get; set; }

        public string Icon { get; set; }

        public int[] Categories { get; set; }
    }
}