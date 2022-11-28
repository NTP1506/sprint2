using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Interface;
using RookieOnlineAssetManagement.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Repositories
{
    public class AssetRepository : IAssetRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public AssetRepository(IMapper mapper, ApplicationDbContext context, UserManager<User> userManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _context = context;
        }

        public async Task<AssetDTO> AssetCreateAsync(AssetCreateDTO assetCreateDTO, User user)
        {
            Category category = await _context.Categories.FindAsync(assetCreateDTO.CategoryId);
            if (category == null)
            {
                throw new Exception("Invalid Category");
            }
            Asset asset = _mapper.Map<Asset>(assetCreateDTO);

            int countAsset = await _context.Assets.Where(a => a.AssetCode.StartsWith(category.Prefix)).CountAsync();
            asset.AssetCode = category.Prefix + (countAsset + 1).ToString().PadLeft(6, '0');
            asset.Category = category;
            //asset.Location = user.Location;

            await _context.Assets.AddAsync(asset);
            await _context.SaveChangesAsync();
            var assetDto = _mapper.Map<AssetDTO>(asset);
            return assetDto;
        }
    }
}
