using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VicFit.Web.Interfaces;
using VicFit.Web.Models;
using VicFit.Web.Responses;

namespace VicFit.Web.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/article")]
    public class ArticleApiController : ApiController
    {
        private IArticleService _articleService;

        public ArticleApiController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        [HttpGet]
        [Route]
        public HttpResponseMessage GetArticles()
        {
            try
            {
                ItemsResponse<ArticleDomainModel> resp = new ItemsResponse<ArticleDomainModel>();
                resp.Items = _articleService.GetHtmlAsync();
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}