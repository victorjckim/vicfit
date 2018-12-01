using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VicFit.Web.Models
{
    public class DailyTotalViewModel
    {
        public int TotalCalories { get; set; }
        public int TotalCarbs { get; set; }
        public int TotalFats { get; set; }
        public int TotalProteins { get; set; }
        public string Date { get; set; }
        public string UserId { get; set; }
    }
}