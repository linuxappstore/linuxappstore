using System.Diagnostics.SymbolStore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using LinuxAppStore_Backend.Data;
using LinuxAppStore_Backend.Data.Entity;
using LinuxAppStore_Backend.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using static LinuxAppStore_Backend.Util.Enumerations;
using Microsoft.EntityFrameworkCore;
using LinuxAppStore_Backend.Model.Dto;

namespace LinuxAppStore_Backend.Controllers
{
    [Route("api/")]
    [ApiController]
    [EnableCors("CorsPolicy")]
    public class ApiController : ControllerBase
    {

        private readonly DataContext _context;
        private readonly IMapper _mapper;

        private readonly IConfiguration _configuration;

        private readonly LinuxAppService _linuxAppService;

        public ApiController(
            DataContext context,
            IMapper mapper,
            IConfiguration configuration,
            LinuxAppService linuxAppService)
        {
            _context = context;
            _mapper = mapper;
            _configuration = configuration;
            _linuxAppService = linuxAppService;
        }

        [HttpGet("GetAppsForCategory")]
        public IEnumerable<LinuxAppListItemDto> GetAppsForCategory(int? categoryId) {
            return _linuxAppService.GetAppsForCategory(categoryId);
        }

        // GET api/apps
        [HttpGet("Apps")]
        public IEnumerable<LinuxAppListItemDto> Apps(int? type)
        {
            var list = _linuxAppService.GetDisplayList(type);

            return list;
        }

        [DisableRequestSizeLimit]
        [HttpPost("Apps")]
        public async Task<IActionResult> Apps([FromBody] LinuxAppPostModel model)
        {
            if (model == null || model.Apps == null)
            {
                return BadRequest();
            }

            var apiKey = _configuration.GetValue<string>("ApiKey");

            if (apiKey != model.ApiKey) {
                return BadRequest();
            }

            _linuxAppService.SaveApps(model);            
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("LinuxAppCategories")]
        public async Task<IActionResult> LinuxAppCategories(LinuxAppCategoryPostModel model) {
            if (model == null || model.Categories == null) {
                return BadRequest();
            }

            var apiKey = _configuration.GetValue<string>("ApiKey");

            if (apiKey != model.ApiKey) {
                return BadRequest();
            }

            var currentEntities = _context.LinuxApps.Where(x => x.Type == model.Type)
            .Include(x => x.LinuxAppCategorys).ToList();

            var entities = _mapper.Map<List<LinuxAppCategory>>(model.Categories);

            foreach(var item in currentEntities) {
                var categories = entities.Where(x => x.LinuxAppId == item.Id).ToList();
                item.LinuxAppCategorys = categories;
                _context.LinuxApps.Update(item);
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("GetAppDetail")]
        public LinuxAppDetailDto GetAppDetail(int id) {
            var list = new List<LinuxAppModel>();
            var entity = _context.LinuxApps.Where(x => x.Id == id).FirstOrDefault();

            if (entity != null) {
                var sources = _context.LinuxApps.Where(x => x.Name.ToLower() == entity.Name.ToLower()).ProjectTo<LinuxAppModel>(_mapper.ConfigurationProvider).ToList();
                list.AddRange(sources);
            }

            var dto = new LinuxAppDetailDto {
                Name = entity?.Name,
                Apps = list.ToArray()
            };

            return dto;
        }

        // GET api/recentlyadded
        [HttpGet("RecentlyAdded")]
        public async Task<IActionResult> RecentlyAdded(int? type, int? limit)
        {
            var query = await _context.GetVwRecentlyAdded();

            if (type.HasValue)
            {
                query = query.Where(x => x.Type == type.Value);
            }

            if (limit.HasValue)
            {
                query = query.Take(limit.Value);
            }

            return Ok(query);
        }

        // GET api/recentlyadded
        [HttpGet("RecentlyUpdated")]
        public async Task<IActionResult> RecentlyUpdated(int? type, int? limit)
        {
            var query = await _context.GetVwRecentlyUpdated();

            if (type.HasValue)
            {
                query = query.Where(x => x.Type == type.Value);
            }

            if (limit.HasValue)
            {
                query = query.Take(limit.Value);
            }

            return Ok(query);
        }

    }
}
