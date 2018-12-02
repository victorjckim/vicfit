using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VicFit.Web.Requests
{
    public class ProfileUpdateRequest
    {
        public int CurrentWeight { get; set; }
        public int GoalWeight { get; set; }
        public int ProfileId { get; set; }
    }
}