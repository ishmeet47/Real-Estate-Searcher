using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        private readonly int userId;
        public BaseController()
        {
            this.userId = 3; // User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }

        protected int GetUserId()
        {
            return this.userId;
        }
    }
}