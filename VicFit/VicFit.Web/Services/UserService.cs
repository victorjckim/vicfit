using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using VicFit.Web.Interfaces;

namespace VicFit.Web.Services
{
    public class UserService : IUserService
    {
        private IDataProvider _dataProvider;

        public UserService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public string SelectIdByUsername(string name)
        {
            string id = "";
            _dataProvider.ExecuteCmd(
                "AspNetUsers_SelectIdByUsername",
                inputParamMapper : delegate(SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@Username", name);
                },
                singleRecordMapper : delegate(IDataReader reader, short set)
                {
                    int idx = 0;
                    id = reader.GetString(idx);
                });
            return id;
        }
    }
}