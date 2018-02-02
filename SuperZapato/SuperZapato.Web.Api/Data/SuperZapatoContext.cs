using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SuperZapato.Web.Api.Models;

namespace SuperZapato.Web.Api.Models
{
    public class SuperZapatoContext : DbContext
    {
        public SuperZapatoContext (DbContextOptions<SuperZapatoContext> options)
            : base(options)
        {
        }

        public DbSet<SuperZapato.Web.Api.Models.Articles> Articles { get; set; }

        public DbSet<SuperZapato.Web.Api.Models.Stores> Stores { get; set; }
    }
}
