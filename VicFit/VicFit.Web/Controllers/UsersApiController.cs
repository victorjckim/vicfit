using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using VicFit.Web.Interfaces;
using VicFit.Web.Responses;

namespace VicFit.Web.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/users")]
    public class UsersApiController : ApiController
    {
        private IUserService _userService;

        public UsersApiController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("getid")]
        public HttpResponseMessage SelectIdByUsername(string email)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    string id = _userService.SelectIdByUsername(email);
                    ItemResponse<string> resp = new ItemResponse<string>();
                    resp.Item = id;
                    return Request.CreateResponse(HttpStatusCode.OK, resp); 
                } else {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}