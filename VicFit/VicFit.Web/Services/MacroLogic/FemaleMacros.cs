using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using VicFit.Web.Interfaces;
using VicFit.Web.Models;

namespace VicFit.Web.Services.MacroLogic
{
    public class FemaleMacros : IMacroStrategy
    {
        private IProfileService _profileService;

        public FemaleMacros(IProfileService profileService)
        {
            _profileService = profileService;
        }

        public MacrosViewModel calcMacros(string userId, int profileId)
        {
            MacrosViewModel model = new MacrosViewModel();
            var profileStats = _profileService.SelectByUserId(userId);
            int calories = (int)(Math.Round(Convert.ToDouble((profileStats.Activity)) * (66 + (6.23 * profileStats.CurrentWeight) + (12.7 * profileStats.Height) - (6.8 * profileStats.Age))));
            int carbs = 0;
            int fats = 0;
            int proteins = 0;

            if (profileStats.GoalId == 1) {
                calories -= 300;
                proteins = (int)Math.Round(Convert.ToDouble(0.8 * (0.8 * profileStats.CurrentWeight)));
                fats = (int)Math.Round(Convert.ToDouble(0.35 * (0.8 * profileStats.CurrentWeight)));
                carbs = (calories - ((proteins * 4) + (fats * 9))) / 4;
            } else if (profileStats.GoalId == 2) {
                calories += 300;
                proteins = (int)Math.Round(Convert.ToDouble(0.8 * (0.8 * profileStats.CurrentWeight)));
                fats = (int)Math.Round(Convert.ToDouble(0.35 * (0.8 * profileStats.CurrentWeight)));
                carbs = (calories - ((proteins * 4) + (fats * 9))) / 4;
            } else {
                calories += 100;
                proteins = (int)Math.Round(Convert.ToDouble(0.8 * (0.8 * profileStats.CurrentWeight)));
                fats = (int)Math.Round(Convert.ToDouble(0.35 * (0.8 * profileStats.CurrentWeight)));
                carbs = (calories - ((proteins * 4) + (fats * 9))) / 4;
            }

            model.Calories = calories;
            model.Carbs = carbs;
            model.Fats = fats;
            model.Proteins = proteins;
            model.ProfileId = profileId;

            return model;
        }
    }
}