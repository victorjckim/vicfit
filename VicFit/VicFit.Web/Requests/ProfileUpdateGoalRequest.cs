using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VicFit.Web.Requests
{
    public class ProfileUpdateGoalRequest
    {
        public int GoalId { get; set; }
        public int ProfileId { get; set; }
    }
}