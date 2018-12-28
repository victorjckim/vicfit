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
    public class ExerciseService : IExerciseService
    {
        private IDataProvider _dataProvider;

        public ExerciseService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public int Create(ExerciseAddRequest model)
        {
            int id = 0;
            _dataProvider.ExecuteNonQuery(
                "Exercise_Insert",
                inputParamMapper : delegate(SqlParameterCollection paramList)
                {
                    SqlParameter param = new SqlParameter();
                    param.ParameterName = "@Id";
                    param.SqlDbType = SqlDbType.Int;
                    param.Direction = ParameterDirection.Output;
                    paramList.Add(param);

                    paramList.AddWithValue("@ExerciseName", model.ExerciseName);
                    paramList.AddWithValue("@Calories", model.Calories);
                    paramList.AddWithValue("@Date", model.Date);
                    paramList.AddWithValue("@UserId", model.UserId);
                },
                returnParameters : delegate(SqlParameterCollection paramList)
                {
                    id = (int)paramList["@Id"].Value;
                });
            return id;
        }

        public List<ExerciseViewModel> SelectByUserId(string userId, string date)
        {
            List<ExerciseViewModel> result = new List<ExerciseViewModel>();
            _dataProvider.ExecuteCmd(
                "Exercise_SelectByUserId",
                inputParamMapper : delegate(SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@UserId", userId);
                    paramList.AddWithValue("@Date", date);
                },
                singleRecordMapper : delegate(IDataReader reader, short set)
                {
                    ExerciseViewModel model = new ExerciseViewModel();
                    int idx = 0;
                    model.Id = reader.GetInt32(idx++);
                    model.ExerciseName = reader.GetString(idx++);
                    model.Calories = reader.GetInt32(idx++);
                    model.Date = reader.GetString(idx++);
                    result.Add(model);
                    idx++;
                });
            return result;
        }

        public CaloriesBurnedViewModel SelectTotalByUserId(string userId)
        {
            CaloriesBurnedViewModel model = new CaloriesBurnedViewModel();
            _dataProvider.ExecuteCmd(
                "Exercise_SelectTotalByUserId",
                inputParamMapper : delegate(SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@UserId", userId);
                },
                singleRecordMapper : delegate(IDataReader reader, short set)
                {
                    int idx = 0;
                    model.CaloriesBurned = reader.GetInt32(idx++);
                    model.Date = reader.GetString(idx++);
                    model.UserId = reader.GetString(idx++);
                    idx++;
                });
            return model;
        }

        public void Delete(int id)
        {
            _dataProvider.ExecuteNonQuery(
                "Exercise_Delete",
                inputParamMapper : delegate(SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@Id", id);
                });
        }
    }
}