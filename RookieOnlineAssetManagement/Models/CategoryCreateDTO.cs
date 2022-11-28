using Duende.IdentityServer.Models;
using System.ComponentModel.DataAnnotations;

namespace RookieOnlineAssetManagement.Models
{
    public class CategoryCreateDTO
    {
        [Required(ErrorMessage = "Please enter Category Name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please enter Category Prefix")]
        public string Prefix { get; set; }
    }
}
