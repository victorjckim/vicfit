using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using VicFit.Web.Interfaces;
using VicFit.Web.Models;
using VicFit.Web.Requests;

namespace VicFit.Web.Services
{
    public class ProfileService : IProfileService
    {
        private IDataProvider _dataProvider;

        public ProfileService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public int Create(ProfileAddRequest model)
        {
            int id = 0;
            _dataProvider.ExecuteNonQuery(
                "Profile_Insert",
                inputParamMapper : delegate(SqlParameterCollection paramList)
                {
                    SqlParameter param = new SqlParameter();
                    param.ParameterName = "@Id";
                    param.SqlDbType = SqlDbType.Int;
                    param.Direction = ParameterDirection.Output;
                    paramList.Add(param);

                    paramList.AddWithValue("@Height", model.Height);
                    paramList.AddWithValue("@CurrentWeight", model.CurrentWeight);
                    paramList.AddWithValue("@GoalWeight", model.GoalWeight);
                    paramList.AddWithValue("@Age", model.Age);
                    paramList.AddWithValue("@Gender", model.Gender);
                    paramList.AddWithValue("@GoalId", model.GoalId);
                    paramList.AddWithValue("@Activity", model.Activity);
                    paramList.AddWithValue("@UserId", model.UserId);
                },
                returnParameters : delegate(SqlParameterCollection paramList)
                {
                    id = (int)paramList["@Id"].Value;
                });
            return id;
        }

        public ProfileDomainModel SelectByUserId(string userId)
        {
            ProfileDomainModel model = null;
            _dataProvider.ExecuteCmd(
                "Profile_SelectByUserId",
                inputParamMapper : delegate(SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@UserId", userId);
                },
                singleRecordMapper : delegate(IDataReader reader, short set)
                {
                    int idx = 0;
                    model = MapProfile(reader, idx);
                    idx++;
                });
            return model;
        }

        public static ProfileDomainModel MapProfile(IDataReader reader, int index)
        {
            ProfileDomainModel model = new ProfileDomainModel();
            model.Id = reader.GetInt32(index++);
            model.Height = reader.GetInt32(index++);
            model.CurrentWeight = reader.GetInt32(index++);
            model.GoalWeight = reader.GetInt32(index++);
            model.Age = reader.GetInt32(index++);
            model.Gender = reader.GetString(index++);
            model.GoalId = reader.GetInt32(index++);
            model.Activity = reader.GetDecimal(index++);
            model.UserId = reader.GetString(index++);
            return model;
        }

        public int Update(ProfileUpdateRequest model)
        {
            int id = 0;
            _dataProvider.ExecuteNonQuery(
                "Profile_Update",
                inputParamMapper : delegate(SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@CurrentWeight", model.CurrentWeight);
                    paramList.AddWithValue("@GoalWeight", model.GoalWeight);
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