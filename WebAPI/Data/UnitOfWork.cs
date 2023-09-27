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
        public ICityRepository CityRepository => new CityRepository(_dc);

        public async Task<bool> SaveAsync() => await _dc.SaveChangesAsync() > 0; // > 0 means that at least one row was affected
    }
}
