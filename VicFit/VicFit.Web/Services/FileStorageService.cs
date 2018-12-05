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
    public class FileStorageService : IFileStorageService
    {
        private IDataProvider _dataProvider;

        public FileStorageService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public int Create(FileStorageAddRequest model)
        {
            int id = 0;
            _dataProvider.ExecuteNonQuery(
                "FileStorage_Insert",
                inputParamMapper : delegate(SqlParameterCollection paramList)
                {
                    SqlParameter param = new SqlParameter();
                    param.ParameterName = "@Id";
                    param.SqlDbType = SqlDbType.Int;
                    param.Direction = ParameterDirection.Output;
                    paramList.Add(param);

                    paramList.AddWithValue("@UserFileName", model.UserFileName);
                    paramList.AddWithValue("@BasePath", model.BasePath);
                    paramList.AddWithValue("@SystemFileName", model.SystemFileName);
                    paramList.AddWithValue("@UserId", model.UserId);
                },
                returnParameters : delegate(SqlParameterCollection paramList)
                {
                    id = (int)paramList["@Id"].Value;
                });
            return id;
        }

        public FileStorageViewModel SelectByUserId(string userId)
        {
            FileStorageViewModel model = new FileStorageViewModel();
            _dataProvider.ExecuteCmd(
                "FileStorage_SelectByUserId",
                inputParamMapper : delegate(SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@UserId", userId);
                },
                singleRecordMapper : delegate(IDataReader reader, short set)
                {
                    int idx = 0;
                    model.Id = reader.GetInt32(idx++);
                    model.UserFileName = reader.GetString(idx++);
                    model.BasePath = reader.GetString(idx++);
                    model.SystemFileName = reader.GetString(idx++);
                    model.UserId = reader.GetString(idx++);
                    idx++;
                });
            return model;
        }

        public void Update(FileStorageUpdateRequest model)
        {
            _dataProvider.ExecuteNonQuery(
                "FileStorage_Update",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@Id", model.Id);
                    paramList.AddWithValue("@UserFileName", model.UserFileName);
                    paramList.AddWithValue("@BasePath", model.BasePath);
                    paramList.AddWithValue("@SystemFileName", model.SystemFileName);
                });
        }
    }
}