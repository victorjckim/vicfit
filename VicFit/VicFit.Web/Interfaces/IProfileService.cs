using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VicFit.Web.Requests;

namespace VicFit.Web.Interfaces
{
    public interface IProfileService
    {
        int Create(ProfileAddRequest model);
    }
}
