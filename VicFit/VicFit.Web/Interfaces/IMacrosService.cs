using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VicFit.Web.Models;
using VicFit.Web.Requests;

namespace VicFit.Web.Interfaces
{
    public interface IMacrosService
    {
        int Create(string userId, int profileId);
        MacrosViewModel SelectMacrosByUserId(string userId);
        int Update(string userId, int profileId);
    }
}
