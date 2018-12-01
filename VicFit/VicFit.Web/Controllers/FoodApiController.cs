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
    [RoutePrefix("api/food")]
    public class FoodApiController : ApiController
    {
        private IFoodService _foodService;

        public FoodApiController(IFoodService foodService)
        {
            _foodService = foodService;
        }

        [HttpPost]
        [Route]
        public HttpResponseMessage Create(FoodAddRequest model)
        {
            try
            {
                int id = _foodService.Create(model);
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
        public HttpResponseMessage SelectTotalByUserId(string userId)
        {
            try
            {
                ItemResponse<DailyTotalViewModel> resp = new ItemResponse<DailyTotalViewModel>();
                resp.Item = _foodService.SelectTotalByUserId(userId);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        [Route("{userId}/{date}")]
        public HttpResponseMessage SelectFoodsByUserId(string userId, string date)
        {
            try
            {
                ItemsResponse<FoodViewModel> resp = new ItemsResponse<FoodViewModel>();
                resp.Items = _foodService.SelectFoodsByUserId(userId, date);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}