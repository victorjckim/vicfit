using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VicFit.Web.Models;
using VicFit.Web.Requests;

namespace VicFit.Web.Interfaces
{
    public interface IExerciseService
    {
        int Create(ExerciseAddRequest model);
        List<ExerciseViewModel> SelectByUserId(string userId, string date);
        CaloriesBurnedViewModel SelectTotalByUserId(string userId);
        void Delete(int id);
    }
}
