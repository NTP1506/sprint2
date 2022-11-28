using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Interface
{
    public interface IAssetRepository
    {
        public Task<AssetDTO> AssetCreateAsync(AssetCreateDTO assetCreateDTO, User user);
    }
}
