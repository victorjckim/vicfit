using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VicFit.Web.Models;
using VicFit.Web.Requests;

namespace VicFit.Web.Interfaces
{
    public interface IProfileService
    {
        int Create(ProfileAddRequest model);
        ProfileDomainModel SelectByUserId(string userId);
        int Update(ProfileUpdateRequest model);
    }
}
