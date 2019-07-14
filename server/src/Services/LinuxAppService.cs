using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using LinuxAppStore_Backend.Data;
using LinuxAppStore_Backend.Data.Entity;
using LinuxAppStore_Backend.Model;
using LinuxAppStore_Backend.Model.Dto;
using Microsoft.EntityFrameworkCore;

public class LinuxAppService
{

    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public LinuxAppService(
        DataContext context,
        IMapper mapper
    )
    {
        _context = context;
        _mapper = mapper;
    }

    public IList<LinuxAppModel> GetAppsByType(int? type)
    {
        var list = new List<LinuxAppModel>();

        if (type.HasValue)
        {
            list.AddRange(_context.LinuxApps.Where(x => x.Type == type.Value).ProjectTo<LinuxAppModel>(_mapper.ConfigurationProvider));
        }
        else
        {
            list.AddRange(_context.LinuxApps.ProjectTo<LinuxAppModel>(_mapper.ConfigurationProvider));
        }

        return list;
    }

        public IEnumerable<LinuxAppListItemDto> GetAppsForCategory(int? categoryId) {
            var list = new List<LinuxAppListItemDto>();

            if (categoryId.HasValue)
            {
                var query = (from lac in _context.LinuxAppCategorys
                            join la in _context.LinuxApps on lac.LinuxAppId equals la.Id
                            where lac.CategoryId == categoryId.Value
                            select la);

                var dtos = query
                .Select(x => new LinuxAppListItemDto {
                    Id = x.Id,
                    Name = x.Name,
                    Type = x.Type,
                    Src = x.Src,
                    Icon = x.Icon,
                    Categories = x.LinuxAppCategorys.Select(y => y.CategoryId).ToArray()
                });

                list.AddRange(dtos);
            }

        return list;
    }

    public IEnumerable<LinuxAppListItemDto> GetDisplayList(int? type) {
        var list = new List<LinuxAppListItemDto>();

        if (type.HasValue)
        {
            var dtos = _context.LinuxApps.Where(x => x.Type == type.Value)
            .Select(x => new LinuxAppListItemDto {
                Id = x.Id,
                Name = x.Name,
                Type = x.Type,
                Src = x.Src,
                Icon = x.Icon,
                Categories = x.LinuxAppCategorys.Select(y => y.CategoryId).ToArray()
            });

            list.AddRange(dtos);
        }
        else
        {
            var dtos = _context.LinuxApps.Select(x => new LinuxAppListItemDto {
                Id = x.Id,
                Name = x.Name,
                Type = x.Type,
                Src = x.Src,
                Icon = x.Icon,
                Categories = x.LinuxAppCategorys.Select(y => y.CategoryId).ToArray()
            });

            list.AddRange(dtos);
        }

        return list;
    }

    public void SaveApps(LinuxAppPostModel model)
    {
        var currentEntities = _context.LinuxApps.Include(x => x.LinuxAppCategorys).ToList();
        var entities = model.Apps.AsQueryable().ProjectTo<LinuxApp>(_mapper.ConfigurationProvider).ToList();

        foreach (var item in entities)
        {
            var result = currentEntities.Where(x => x.Identifier == item.Identifier && x.Type == item.Type).FirstOrDefault();

            if (result != null)
            {
                _mapper.Map(item, result);
                result.LastUpdated = DateTime.Now;
                _context.LinuxApps.Update(result);
                currentEntities.Remove(result);
            }
            else
            {
                _context.Add(item);
            }
        }
    }

}