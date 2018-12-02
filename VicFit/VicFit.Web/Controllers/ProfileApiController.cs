using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VicFit.Web.Interfaces;
using VicFit.Web.Models;
using VicFit.Web.Requests;
using VicFit.Web.Responses;

namespace VicFit.Web.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/profile")]
    public class ProfileApiController : ApiController
    {
        private IProfileService _profileService;
        private IMacrosService _macrosService;

        public ProfileApiController(IProfileService profileService, IMacrosService macrosService)
        {
            _profileService = profileService;
            _macrosService = macrosService;
        }

        [HttpPost]
        [Route("")]
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

        [HttpGet]
        [Route("{userId}")]
        public HttpResponseMessage SelectByUserId(string userId)
        {
            try
            {
                ItemResponse<ProfileDomainModel> resp = new ItemResponse<ProfileDomainModel>();
                resp.Item = _profileService.SelectByUserId(userId);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPut]
        [Route("{userId}")]
        public HttpResponseMessage Update(ProfileUpdateRequest model, string userId)
        {
            try
            {
                int id = _profileService.Update(model);
                int idTwo = _macrosService.Update(userId, id);
                ItemResponse<int> resp = new ItemResponse<int>();
                resp.Item = idTwo;
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}