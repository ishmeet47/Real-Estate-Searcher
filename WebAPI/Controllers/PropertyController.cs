using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class PropertyController : BaseController
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public PropertyController(IUnitOfWork uow,
        IMapper mapper)
        {
            this._uow = uow;
            this._mapper = mapper;
        }

        //property/list/1
        [HttpGet("list/{sellRent}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyList(int sellRent)
        {
            var properties = await _uow.PropertyRepository.GetPropertiesAsync(sellRent);
            var propertyListDTO = _mapper.Map<IEnumerable<PropertyListDto>>(properties);
            return Ok(propertyListDTO);
        }

        //property/detail/1
        [HttpGet("detail/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyDetail(int id)
        {
            var property = await _uow.PropertyRepository.GetPropertyDetailAsync(id);
            var propertyDTO = _mapper.Map<PropertyDetailDto>(property);
            return Ok(propertyDTO);
        }

        //property/add
        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddProperty(PropertyDto propertyDto)
        {
            var property = _mapper.Map<Property>(propertyDto);
            var userId = GetUserId();
            property.PostedBy = userId;
            property.LastUpdatedBy = userId;
            _uow.PropertyRepository.AddProperty(property);
            await _uow.SaveAsync();
            return StatusCode(201);
        }

        //property/set-primary-photo/42/jl0sdfl20sdf2s
        [HttpPost("set-primary-photo/{propId}/{photoPublicId}")]
        [Authorize]
        public async Task<IActionResult> SetPrimaryPhoto(int propId, string photoPublicId)
        {
            var userId = GetUserId();

            var property = await _uow.PropertyRepository.GetPropertyByIdAsync(propId);

            if (property.PostedBy != userId)
                return BadRequest("You are not authorised to change the photo");

            if (property == null || property.PostedBy != userId)
                return BadRequest("No such property or photo exists");

            var photo = property.Photos.FirstOrDefault(p => p.PublicId == photoPublicId);

            if (photo == null)
                return BadRequest("No such property or photo exists");

            if (photo.IsPrimary)
                return BadRequest("This is already a primary photo");


            var currentPrimary = property.Photos.FirstOrDefault(p => p.IsPrimary);
            if (currentPrimary != null) currentPrimary.IsPrimary = false;
            photo.IsPrimary = true;

            if (await _uow.SaveAsync()) return NoContent();

            return BadRequest("Failed to set primary photo");
        }

    }
}