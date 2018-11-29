using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VicFit.Web.Responses
{
    public class SuccessResponse : BaseResponse
    {
        public SuccessResponse()
        {
            this.IsSuccessful = true;
        }
    }
}