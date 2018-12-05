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
    }
}