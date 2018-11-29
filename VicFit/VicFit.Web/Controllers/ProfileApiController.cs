using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VicFit.Web.Interfaces;
using VicFit.Web.Requests;
using VicFit.Web.Responses;

namespace VicFit.Web.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/profile")]
    public class ProfileApiController : ApiController
    {
        private IProfileService _profileService;

        public ProfileApiController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpPost]
        [Route]
        public HttpResponseMessage Create(ProfileAddRequest model)
        {
            try
            {
                int id = _profileService.Create(model);
                ItemResponse<int> resp = new ItemResponse<int>();
                resp.Item = id;
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}