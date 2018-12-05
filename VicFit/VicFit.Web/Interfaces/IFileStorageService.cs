using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VicFit.Web.Models;
using VicFit.Web.Requests;

namespace VicFit.Web.Interfaces
{
    public interface IFileStorageService
    {
        int Create(FileStorageAddRequest model);
        FileStorageViewModel SelectByUserId(string userId);
        void Update(FileStorageUpdateRequest model);
    }
}
