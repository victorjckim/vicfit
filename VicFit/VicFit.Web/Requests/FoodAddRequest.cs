using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VicFit.Web.Requests
{
    public class FoodAddRequest
    {
        public string Meal { get; set; }
        public string FoodName { get; set; }
        public int Calories { get; set; }
        public int Carbs { get; set; }
        public int Fats { get; set; }
        public int Proteins { get; set; }
        public string Date { get; set; }
        public string UserId { get; set; }
    }
}