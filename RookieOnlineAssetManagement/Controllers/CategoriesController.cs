using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Interface;
using RookieOnlineAssetManagement.Models;
using RookieOnlineAssetManagement.Repositories;
using System.Threading.Tasks;
using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace RookieOnlineAssetManagement.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoriesController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        [HttpGet("[action]")]
        public async Task<ActionResult<List<CategoryCreateDTO>>> GetAll()
        {
            var categoryList = await _categoryRepository.GetAllAsync();
            if(categoryList == null)
            {
                return NotFound();
            }
            return Ok(categoryList);
            
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateCategory(CategoryCreateDTO model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var newCategory = await _categoryRepository.CategoryCreateAsync(model);
                    if(newCategory == null)
                    {
                        return BadRequest();
                    }    
                    return Ok(newCategory);
                }
                catch(Exception e) { return BadRequest(e.Message); }
                
            }
            return BadRequest();
        }
    }
}
