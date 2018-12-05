using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VicFit.Web.Requests;

namespace VicFit.Web.Models
{
    public class FileStorageViewModel
    {
        public int Id { get; set; }
        public string UserFileName { get; set; }
        public string BasePath { get; set; }
        public string SystemFileName { get; set; }
        public string UserId { get; set; }
    }
}