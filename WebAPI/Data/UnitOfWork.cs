using System.Threading.Tasks;
using WebAPI.Data.Repo;
using WebAPI.Interfaces;

namespace WebAPI.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _dc;

        public UnitOfWork(DataContext dc)
        {
            this._dc = dc;
        }
        public ICityRepository CityRepository =>
            new CityRepository(_dc);

        public IUserRepository UserRepository =>
            new UserRepository(_dc);

        public IFurnishingTypeRepository FurnishingTypeRepository =>
            new FurnishingTypeRepository(_dc);

        public IPropertyTypeRepository PropertyTypeRepository =>
            new PropertyTypeRepository(_dc);

        public IPropertyRepository PropertyRepository =>
            new PropertyRepository(_dc);

        public async Task<bool> SaveAsync()
        {
            return await _dc.SaveChangesAsync() > 0;
        }
    }
}