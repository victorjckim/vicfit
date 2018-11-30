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
    [RoutePrefix("api/macros")]
    public class MacrosApiController : ApiController
    {
        private IMacrosService _macrosService;

        public MacrosApiController(IMacrosService macrosService)
        {
            _macrosService = macrosService;
        }

        [HttpPost]
        [Route("{userId}/{profileId:int}")]
        public HttpResponseMessage Create(string userId, int profileId)
        {
            try
            {
                int id = _macrosService.Create(userId, profileId);
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
        public HttpResponseMessage SelectMacrosByUserId(string userId)
        {
            try
            {
                ItemResponse<MacrosViewModel> resp = new ItemResponse<MacrosViewModel>();
                resp.Item = _macrosService.SelectMacrosByUserId(userId);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}