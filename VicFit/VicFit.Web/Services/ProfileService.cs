using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using VicFit.Web.Interfaces;
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
    }
}