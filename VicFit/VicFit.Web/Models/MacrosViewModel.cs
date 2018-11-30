using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VicFit.Web.Models
{
    public class MacrosViewModel
    {
        public int ProfileId { get; set; }
        public int Calories { get; set; }
        public int Carbs { get; set; }
        public int Fats { get; set; }
        public int Proteins { get; set; }
    }
}