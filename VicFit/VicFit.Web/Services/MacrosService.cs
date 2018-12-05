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
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    SqlParameter param = new SqlParameter();
                    param.ParameterName = "@Id";
                    param.SqlDbType = SqlDbType.Int;
                    param.Direction = ParameterDirection.Output;
                    paramList.Add(param);

                    MacrosViewModel model = new MacrosViewModel();
                    var profileStats = _profileService.SelectByUserId(userId);

                    if (profileStats.Gender == "M") {
                        model = _maleMacros.calcMacros(userId, profileId);
                    } else {
                        model = _femaleMacros.calcMacros(userId, profileId);
                    }

                    paramList.AddWithValue("@Calories", model.Calories);
                    paramList.AddWithValue("@Carbs", model.Carbs);
                    paramList.AddWithValue("@Fats", model.Fats);
                    paramList.AddWithValue("@Proteins", model.Proteins);
                    paramList.AddWithValue("@ProfileId", model.ProfileId);
                },
                returnParameters: delegate (SqlParameterCollection paramList)
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
                    MacrosViewModel model = new MacrosViewModel();
                    var profileStats = _profileService.SelectByUserId(userId);

                    if (profileStats.Gender == "M") {
                        model = _maleMacros.calcMacros(userId, profileId);
                    } else {
                        model = _femaleMacros.calcMacros(userId, profileId);
                    }

                    paramList.AddWithValue("@Calories", model.Calories);
                    paramList.AddWithValue("@Carbs", model.Carbs);
                    paramList.AddWithValue("@Fats", model.Fats);
                    paramList.AddWithValue("@Proteins", model.Proteins);
                    paramList.AddWithValue("@ProfileId", model.ProfileId);
                },
                returnParameters : delegate(SqlParameterCollection paramList)
                {
                    id = (int)paramList["@ProfileId"].Value;
                });
            return id;
        }
    }
}