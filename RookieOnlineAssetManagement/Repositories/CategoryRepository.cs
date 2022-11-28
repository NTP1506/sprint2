using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Interface;
using RookieOnlineAssetManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public CategoryRepository(IMapper mapper, ApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<List<CategoryCreateDTO>> GetAllAsync()
        {
            List<Category> categories = await _context.Categories.Where(c => !c.IsDisabled).ToListAsync();
            var categoryGetAll = _mapper.Map<List<CategoryCreateDTO>>(categories);
            return categoryGetAll;
        }
        public async Task<CategoryCreateDTO> CategoryCreateAsync(CategoryCreateDTO categoryCreateDTO)
        {
            Category category = await _context.Categories.FirstOrDefaultAsync(c => c.Name.ToLower() == categoryCreateDTO.Name.ToLower()
                                                                                          || c.Prefix.ToLower() == categoryCreateDTO.Prefix.ToLower());
            if (category != null)
            {
                if (category.Name.ToLower() == categoryCreateDTO.Name.ToLower())
                {
                    throw new Exception("Category is already existed. Please enter a different category");//BadRequest("Category is already existed. Please enter a different category");
                }
                throw new Exception("Prefix is already existed. Please enter a different prefix");
            }
            try
            {
                categoryCreateDTO.Prefix = categoryCreateDTO.Prefix.ToUpper();
                Category newCategory = _mapper.Map<Category>(categoryCreateDTO);
                await _context.Categories.AddAsync(newCategory);
                await _context.SaveChangesAsync();
                return categoryCreateDTO;
            }
            catch { return null; }
        }
    }
}
