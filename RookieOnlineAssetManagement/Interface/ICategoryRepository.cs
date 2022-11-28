using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Interface
{
    public interface ICategoryRepository
    {
        public Task<CategoryCreateDTO> CategoryCreateAsync(CategoryCreateDTO categoryCreateDTO);
        public Task<List<CategoryCreateDTO>> GetAllAsync();
    }
}

