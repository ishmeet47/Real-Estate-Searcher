using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected int GetUserId()
        {
            //var nameIdentifier = ClaimTypes.NameIdentifier;
            //Console.Write("nameIdentifier: ");
            //Console.WriteLine(nameIdentifier);
            //var userId = User.FindFirst(nameIdentifier);
            //Console.Write("userId: ");
            //Console.WriteLine(userId);
            //var userIdValue = userId.Value;
            //Console.Write("userIdValue: ");
            //Console.WriteLine(userIdValue);
            //return int.Parse(userIdValue);

            //var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            // Temporary fix for the above code
            return 3;
        }
    }
}