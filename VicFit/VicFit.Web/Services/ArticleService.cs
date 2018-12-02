using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VicFit.Web.Interfaces;
using VicFit.Web.Models;

namespace VicFit.Web.Services
{
    public class ArticleService : IArticleService
    {
        public List<ArticleDomainModel> GetHtmlAsync()
        {
            List<ArticleDomainModel> result = new List<ArticleDomainModel>();
            var url = "https://www.sciencedaily.com/news/health_medicine/fitness/";
            var web = new HtmlWeb();
            var htmlDoc = web.Load(url);
            var titles = htmlDoc.DocumentNode.SelectNodes("//*[@id='featured_shorts']//li/a");

            foreach (var node in titles.Zip(titles, (t, l) => new ArticleDomainModel
            { Title = t.InnerText, Link = l.GetAttributeValue("href", "") }))
            {
                result.Add(node);
            }
            return result;
        }
    }
}