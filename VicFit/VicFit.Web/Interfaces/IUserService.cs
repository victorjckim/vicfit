using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VicFit.Web.Interfaces
{
    public interface IUserService
    {
        string SelectIdByUsername(string name);
    }
}
