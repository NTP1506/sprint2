using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Interface;
using RookieOnlineAssetManagement.Models;
using System.Threading.Tasks;
using System;

namespace RookieOnlineAssetManagement.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IAssetRepository _assetRepository;

        public AssetsController(UserManager<User> userManager,IAssetRepository assetRepository)
        {
            _userManager = userManager;
            _assetRepository = assetRepository;
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateAsset(AssetCreateDTO model)
        {
            var user = await _userManager.GetUserAsync(User);
            if (ModelState.IsValid)
            {
                try
                {
                    AssetDTO newAsset = await _assetRepository.AssetCreateAsync(model, user);
                    return Ok(newAsset);
                }
                catch (Exception e) { return BadRequest(e.Message); }
            }
            return BadRequest();
        }

    }
}
