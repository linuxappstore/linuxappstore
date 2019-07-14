using LinuxAppStore_Backend.Data.Entity;
using LinuxAppStore_Backend.Util;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LinuxAppStore_Backend.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            foreach (var entity in builder.Model.GetEntityTypes())
            {
                entity.Relational().TableName = entity.Relational().TableName.ToSnakeCase();
          
                foreach (var property in entity.GetProperties())
                {
                    property.Relational().ColumnName = property.Name.ToSnakeCase();
                }

                foreach (var key in entity.GetKeys())
                {
                    key.Relational().Name = key.Relational().Name.ToSnakeCase();
                }

                foreach (var key in entity.GetForeignKeys())
                {
                    key.Relational().Name = key.Relational().Name.ToSnakeCase();
                }

                foreach (var index in entity.GetIndexes())
                {
                    index.Relational().Name = index.Relational().Name.ToSnakeCase();
                }
            }

            builder.Entity<LinuxApp>()
            .HasMany(x => x.LinuxAppCategorys)
            .WithOne(x => x.LinuxApp);

            builder.Entity<Category>();

            builder.Entity<LinuxAppCategory>()
            .HasKey(x => new { x.CategoryId, x.LinuxAppId });

            builder.Query<VwRecentlyAdded>();
            builder.Query<VwRecentlyUpdated>();
        }

        public DbSet<LinuxApp> LinuxApps { get; set; }

        public DbSet<LinuxAppCategory> LinuxAppCategorys { get; set; }

        public async Task<IQueryable<VwRecentlyAdded>> GetVwRecentlyAdded()
        {
            var list = new List<VwRecentlyAdded>();

            try
            {
                list = await this.Query<VwRecentlyAdded>().FromSql("SELECT id, name, type, date_added as dateadded, last_updated as lastupdated," +
                    " src, icon, current_version as currentversion" +
                    " FROM vw_recently_added").ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return list.AsQueryable();
        }

        public async Task<IQueryable<VwRecentlyUpdated>> GetVwRecentlyUpdated()
        {
            var list = new List<VwRecentlyUpdated>();

            try
            {
                list = await this.Query<VwRecentlyUpdated>().FromSql("SELECT id, name, type, date_added as dateadded, last_updated as lastupdated," +
                    " src, icon, current_version as currentversion" +
                    " FROM vw_recently_updated").ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return list.AsQueryable();
        }


    }
}
