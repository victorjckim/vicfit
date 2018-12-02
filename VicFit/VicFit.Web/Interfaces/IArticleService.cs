using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VicFit.Web.Models;

namespace VicFit.Web.Interfaces
{
    public interface IArticleService
    {
        List<ArticleDomainModel> GetHtmlAsync();
    }
}
