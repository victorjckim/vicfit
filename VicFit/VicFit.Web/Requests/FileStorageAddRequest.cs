using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VicFit.Web.Requests
{
    public class FileStorageAddRequest
    {
        public string UserFileName { get; set; }
        public string BasePath { get; set; }
        public string SystemFileName { get; set; }
        public string UserId { get; set; }
    }
}