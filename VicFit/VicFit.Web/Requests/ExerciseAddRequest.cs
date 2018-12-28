using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VicFit.Web.Requests
{
    public class ExerciseAddRequest
    {
        public string ExerciseName { get; set; }
        public int Calories { get; set; }
        public string Date { get; set; }
        public string UserId { get; set; }
    }
}