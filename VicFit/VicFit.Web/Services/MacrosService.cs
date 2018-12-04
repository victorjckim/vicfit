using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Http;
using VicFit.Web.Interfaces;
using VicFit.Web.Models;
using VicFit.Web.Requests;
using VicFit.Web.Services.MacroLogic;

namespace VicFit.Web.Services
{
    public class MacrosService : IMacrosService
    {
        private IDataProvider _dataProvider;
        private IProfileService _profileService;
        private MaleMacros _maleMacros;
        private FemaleMacros _femaleMacros;

        public MacrosService(IDataProvider dataProvider, IProfileService profileService, MaleMacros maleMacros, FemaleMacros femaleMacros)
        {
            _dataProvider = dataProvider;
            _profileService = profileService;
            _maleMacros = maleMacros;
            _femaleMacros = femaleMacros;
        }

        public int Create(string userId, int profileId)
        {
            int id = 0;
            _dataProvider.ExecuteNonQuery(
                "Macros_Insert",
                inputParamMapper: delegate(SqlParameterCollection paramList)
                {
                    SqlParameter param = new SqlParameter();
                    param.ParameterName = "@Id";
                    param.SqlDbType = SqlDbType.Int;
                    param.Direction = ParameterDirection.Output;
                    paramList.Add(param);

                    var profileStats = _profileService.SelectByUserId(userId);

                    if (profileStats.Gender == "M") {
                        _maleMacros.calcMacros(userId, profileId);
                    } else {
                        _femaleMacros.calcMacros(userId, profileId);
                    }
                    //int calories = 0;
                    //int carbs = 0;
                    //int fats = 0;
                    //int proteins = 0;
                    

                    // calories and macros based on gender and goal
                    //if (profileStats.Gender == "M") {
                    //    calories = (int)(Math.Round(Convert.ToDouble((profileStats.Activity)) * (66 + (6.23 * profileStats.CurrentWeight) + (12.7 * profileStats.Height) - (6.8 * profileStats.Age))));
                    //    if (profileStats.GoalId == 1) {
                    //        calories -= 500;
                    //        proteins = (int)Math.Round(Convert.ToDouble(0.9 * (0.8 * profileStats.CurrentWeight)));
                    //        fats = (int)Math.Round(Convert.ToDouble(0.35 * (0.8 * profileStats.CurrentWeight)));
                    //        carbs = (calories - ((proteins * 4) + (fats * 9))) / 4;
                    //    } else if (profileStats.GoalId == 2) {
                    //        calories += 500;
                    //        proteins = (int)Math.Round(Convert.ToDouble(0.7 * (0.8 * profileStats.CurrentWeight)));
                    //        fats = (int)Math.Round(Convert.ToDouble(0.35 * (0.8 * profileStats.CurrentWeight)));
                    //        carbs = (calories - ((proteins * 4) + (fats * 9))) / 4;
                    //    } else {
                    //        calories += 100;
                    //        proteins = (int)Math.Round(Convert.ToDouble(0.8 * (0.8 * profileStats.CurrentWeight)));
                    //        fats = (int)Math.Round(Convert.ToDouble(0.35 * (0.8 * profileStats.CurrentWeight)));
                    //        carbs = (calories - ((proteins * 4) + (fats * 9))) / 4;
                    //    }
                    //} else if (profileStats.Gender == "F") {
                    //    calories = (int)(Math.Round(Convert.ToDouble((profileStats.Activity)) * (655 + (4.35 * profileStats.CurrentWeight) + (4.7 * profileStats.Height) - (4.7 * profileStats.Age))));
                    //    if (profileStats.GoalId == 1) {
                    //        calories -= 300;
                    //        proteins = (int)Math.Round(Convert.ToDouble(0.8 * (0.8 * profileStats.CurrentWeight)));
                    //        fats = (int)Math.Round(Convert.ToDouble(0.35 * (0.8 * profileStats.CurrentWeight)));
                    //        carbs = (calories - ((proteins * 4) + (fats * 9))) / 4;
                    //    } else if (profileStats.GoalId == 2) {
                    //        calories += 300;
                    //        proteins = (int)Math.Round(Convert.ToDouble(0.8 * (0.8 * profileStats.CurrentWeight)));
                    //        fats = (int)Math.Round(Convert.ToDouble(0.35 * (0.8 * profileStats.CurrentWeight)));
                    //        carbs = (calories - ((proteins * 4) + (fats * 9))) / 4;
                    //    } else {
                    //        calories += 100;
                    //        proteins = (int)Math.Round(Convert.ToDouble(0.8 * (0.8 * profileStats.CurrentWeight)));
                    //        fats = (int)Math.Round(Convert.ToDouble(0.35 * (0.8 * profileStats.CurrentWeight)));
                    //        carbs = (calories - ((proteins * 4) + (fats * 9))) / 4;
                    //    }
                    //}

                    //paramList.AddWithValue("@Calories", calories);
                    //paramList.AddWithValue("@Carbs", carbs);
                    //paramList.AddWithValue("@Fats", fats);
                    //paramList.AddWithValue("@Proteins", proteins);
                    //paramList.AddWithValue("@ProfileId", profileId);
                },
                returnParameters : delegate(SqlParameterCollection paramList)
                {
                    id = (int)paramList["@Id"].Value;
                });
            return id;
        }

        public MacrosViewModel SelectMacrosByUserId(string userId)
        {
            MacrosViewModel model = new MacrosViewModel();
            _dataProvider.ExecuteCmd(
                "Profile_SelectMacrosByUserId",
                inputParamMapper : delegate(SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@UserId", userId);
                },
                singleRecordMapper : delegate(IDataReader reader, short set)
                {
                    int idx = 0;
                    model.ProfileId = reader.GetInt32(idx++);
                    model.Calories = reader.GetInt32(idx++);
                    model.Carbs = reader.GetInt32(idx++);
                    model.Fats = reader.GetInt32(idx++);
                    model.Proteins = reader.GetInt32(idx++);
                    idx++;
                });
            return model;
        }

        public int Update(string userId, int profileId)
        {
            int id = 0;
            _dataProvider.ExecuteNonQuery(
                "Macros_Update",
                inputParamMapper : delegate(SqlParameterCollection paramList)
                {
                    int calories = 0;
                    int carbs = 0;
                    int fats = 0;
                    int proteins = 0;
                    var profileStats = _profileService.SelectByUserId(userId);

                    // calories and macros based on gender and goal
                    if (profileStats.Gender == "M")
                    {
                        calories = (int)(Math.Round(Convert.ToDouble((profileStats.Activity)) * (66 + (6.23 * profileStats.CurrentWeight) + (12.7 * profileStats.Height) - (6.8 * profileStats.Age))));
                        if (profileStats.GoalId == 1)
                        {
                            calories -= 500;
                            proteins = (int)Math.Round(Convert.ToDouble(0.9 * (0.8 * profileStats.CurrentWeight)));
                            fats = (int)Math.Round(Convert.ToDouble(0.35 * (0.8 * profileStats.CurrentWeight)));
                            carbs = (calories - ((proteins * 4) + (fats * 9))) / 4;
                        }
                        else if (profileStats.GoalId == 2)
                        {
                            calories += 500;
                            proteins = (int)Math.Round(Convert.ToDouble(0.7 * (0.8 * profileStats.CurrentWeight)));
                            fats = (int)Math.Round(Convert.ToDouble(0.35 * (0.8 * profileStats.CurrentWeight)));
                            carbs = (calories - ((proteins * 4) + (fats * 9))) / 4;
                        }
                        else
                        {
                            calories += 100;
                            proteins = (int)Math.Round(Convert.ToDouble(0.8 * (0.8 * profileStats.CurrentWeight)));
                            fats = (int)Math.Round(Convert.ToDouble(0.35 * (0.8 * profileStats.CurrentWeight)));
                            carbs = (calories - ((proteins * 4) + (fats * 9))) / 4;
                        }
                    }
                    else if (profileStats.Gender == "F")
                    {
                        calories = (int)(Math.Round(Convert.ToDouble((profileStats.Activity)) * (655 + (4.35 * profileStats.CurrentWeight) + (4.7 * profileStats.Height) - (4.7 * profileStats.Age))));
                        if (profileStats.GoalId == 1)
                        {
                            calories -= 300;
                            proteins = (int)Math.Round(Convert.ToDouble(0.8 * (0.8 * profileStats.CurrentWeight)));
                            fats = (int)Math.Round(Convert.ToDouble(0.35 * (0.8 * profileStats.CurrentWeight)));
                            carbs = (calories - ((proteins * 4) + (fats * 9))) / 4;
                        }
                        else if (profileStats.GoalId == 2)
                        {
                            calories += 300;
                            proteins = (int)Math.Round(Convert.ToDouble(0.8 * (0.8 * profileStats.CurrentWeight)));
                            fats = (int)Math.Round(Convert.ToDouble(0.35 * (0.8 * profileStats.CurrentWeight)));
                            carbs = (calories - ((proteins * 4) + (fats * 9))) / 4;
                        }
                        else
                        {
                            calories += 100;
                            proteins = (int)Math.Round(Convert.ToDouble(0.8 * (0.8 * profileStats.CurrentWeight)));
                            fats = (int)Math.Round(Convert.ToDouble(0.35 * (0.8 * profileStats.CurrentWeight)));
                            carbs = (calories - ((proteins * 4) + (fats * 9))) / 4;
                        }
                    }

                    paramList.AddWithValue("@Calories", calories);
                    paramList.AddWithValue("@Carbs", carbs);
                    paramList.AddWithValue("@Fats", fats);
                    paramList.AddWithValue("@Proteins", proteins);
                    paramList.AddWithValue("@ProfileId", profileId);
                },
                returnParameters : delegate(SqlParameterCollection paramList)
                {
                    id = (int)paramList["@ProfileId"].Value;
                });
            return id;
        }
    }
}