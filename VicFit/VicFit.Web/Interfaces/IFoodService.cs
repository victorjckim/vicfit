using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VicFit.Web.Models;
using VicFit.Web.Requests;

namespace VicFit.Web.Interfaces
{
    public interface IFoodService
    {
        int Create(FoodAddRequest model);
        DailyTotalViewModel SelectTotalByUserId(string userId);
        List<FoodViewModel> SelectFoodsByUserId(string userId, string date);
    }
}
