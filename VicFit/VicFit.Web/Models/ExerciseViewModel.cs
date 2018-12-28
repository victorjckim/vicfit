using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VicFit.Web.Models
{
    public class ExerciseViewModel
    {
        public int Id { get; set; }
        public string ExerciseName { get; set; }
        public int Calories { get; set; }
        public string Date { get; set; }
    }
}