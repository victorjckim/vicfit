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
    [RoutePrefix("api/exercise")]
    public class ExerciseApiController : ApiController
    {
        private IExerciseService _exerciseService;

        public ExerciseApiController(IExerciseService exerciseService)
        {
            _exerciseService = exerciseService;
        }

        [HttpPost]
        [Route]
        public HttpResponseMessage Create(ExerciseAddRequest model)
        {
            try
            {
                int id = _exerciseService.Create(model);
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
        [Route("{userId}/{date}")]
        public HttpResponseMessage SelectByUserId(string userId, string date)
        {
            try
            {
                ItemsResponse<ExerciseViewModel> resp = new ItemsResponse<ExerciseViewModel>();
                resp.Items = _exerciseService.SelectByUserId(userId, date);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        [Route("{userId}")]
        public HttpResponseMessage SelectTotalByUserId(string userId)
        {
            try
            {
                ItemResponse<CaloriesBurnedViewModel> resp = new ItemResponse<CaloriesBurnedViewModel>();
                resp.Item = _exerciseService.SelectTotalByUserId(userId);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                _exerciseService.Delete(id);
                SuccessResponse resp = new SuccessResponse();
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}