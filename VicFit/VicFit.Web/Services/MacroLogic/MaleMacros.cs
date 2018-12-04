using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using VicFit.Web.Interfaces;

namespace VicFit.Web.Services.MacroLogic
{
    public class MaleMacros : IMacroStrategy
    {
        private IDataProvider _dataProvider;
        private IProfileService _profileService;

        public MaleMacros(IDataProvider dataProvider, IProfileService profileService)
        {
            _dataProvider = dataProvider;
            _profileService = profileService;
        }

        public int calcMacros(string userId, int profileId)
        {
            int id = 0;
            _dataProvider.ExecuteNonQuery(
                "Macros_Insert",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    SqlParameter param = new SqlParameter();
                    param.ParameterName = "@Id";
                    param.SqlDbType = SqlDbType.Int;
                    param.Direction = ParameterDirection.Output;
                    paramList.Add(param);

                    var profileStats = _profileService.SelectByUserId(userId);
                    int calories = (int)(Math.Round(Convert.ToDouble((profileStats.Activity)) * (66 + (6.23 * profileStats.CurrentWeight) + (12.7 * profileStats.Height) - (6.8 * profileStats.Age))));
                    int carbs = 0;
                    int fats = 0;
                    int proteins = 0;

                    if (profileStats.GoalId == 1) {
                        calories -= 500;
                        proteins = (int)Math.Round(Convert.ToDouble(0.9 * (0.8 * profileStats.CurrentWeight)));
                        fats = (int)Math.Round(Convert.ToDouble(0.35 * (0.8 * profileStats.CurrentWeight)));
                        carbs = (calories - ((proteins * 4) + (fats * 9))) / 4;
                    } else if (profileStats.GoalId == 2) {
                        calories += 500;
                        proteins = (int)Math.Round(Convert.ToDouble(0.7 * (0.8 * profileStats.CurrentWeight)));
                        fats = (int)Math.Round(Convert.ToDouble(0.35 * (0.8 * profileStats.CurrentWeight)));
                        carbs = (calories - ((proteins * 4) + (fats * 9))) / 4;
                    } else {
                        calories += 100;
                        proteins = (int)Math.Round(Convert.ToDouble(0.8 * (0.8 * profileStats.CurrentWeight)));
                        fats = (int)Math.Round(Convert.ToDouble(0.35 * (0.8 * profileStats.CurrentWeight)));
                        carbs = (calories - ((proteins * 4) + (fats * 9))) / 4;
                    }

                    paramList.AddWithValue("@Calories", calories);
                    paramList.AddWithValue("@Carbs", carbs);
                    paramList.AddWithValue("@Fats", fats);
                    paramList.AddWithValue("@Proteins", proteins);
                    paramList.AddWithValue("@ProfileId", profileId);
                },
                returnParameters: delegate (SqlParameterCollection paramList)
               {
                   id = (int)paramList["@Id"].Value;
               });
            return id;
        }
    }
}