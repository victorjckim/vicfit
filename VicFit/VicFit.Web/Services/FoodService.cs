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
    public class FoodService : IFoodService
    {
        private IDataProvider _dataProvider;

        public FoodService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public int Create(FoodAddRequest model)
        {
            int id = 0;
            _dataProvider.ExecuteNonQuery(
                "Food_Insert",
                inputParamMapper : delegate(SqlParameterCollection paramList)
                {
                    SqlParameter param = new SqlParameter();
                    param.ParameterName = "@Id";
                    param.SqlDbType = SqlDbType.Int;
                    param.Direction = ParameterDirection.Output;
                    paramList.Add(param);

                    paramList.AddWithValue("@Meal", model.Meal);
                    paramList.AddWithValue("@FoodName", model.FoodName);
                    paramList.AddWithValue("@Calories", model.Calories);
                    paramList.AddWithValue("@Carbs", model.Carbs);
                    paramList.AddWithValue("@Fats", model.Fats);
                    paramList.AddWithValue("@Proteins", model.Proteins);
                    paramList.AddWithValue("@Date", model.Date);
                    paramList.AddWithValue("@UserId", model.UserId);
                },
                returnParameters : delegate(SqlParameterCollection paramList)
                {
                    id = (int)paramList["@Id"].Value;
                });
            return id;
        }

        public DailyTotalViewModel SelectTotalByUserId(string userId)
        {
            DailyTotalViewModel model = new DailyTotalViewModel();
            _dataProvider.ExecuteCmd(
                "Food_SelectTotalByUserId",
                inputParamMapper : delegate(SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@UserId", userId);
                },
                singleRecordMapper : delegate(IDataReader reader, short set)
                {
                    int idx = 0;
                    model.TotalCalories = reader.GetInt32(idx++);
                    model.TotalCarbs = reader.GetInt32(idx++);
                    model.TotalFats = reader.GetInt32(idx++);
                    model.TotalProteins = reader.GetInt32(idx++);
                    model.Date = reader.GetString(idx++);
                    model.UserId = reader.GetString(idx++);
                    idx++;
                });
            return model;
        }
    }
}