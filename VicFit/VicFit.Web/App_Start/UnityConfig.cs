using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Configuration;
using System.Web.Http;
using System.Web.Mvc;
using Unity;
using Unity.Injection;
using Unity.WebApi;
using VicFit.Web.Controllers;
using VicFit.Web.Interfaces;
using VicFit.Web.Models;
using VicFit.Web.Providers;
using VicFit.Web.Services;

namespace VicFit.Web
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();

            container.RegisterType<IDataProvider, SqlDataProvider>(
                new InjectionConstructor(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString));

            // for ASP.NET built-in controller
            container.RegisterType<IUserStore<ApplicationUser>, UserStore<ApplicationUser>>();
            container.RegisterType<AccountController>(new InjectionConstructor());

            // register your interfaces here
            container.RegisterType<IUserService, UserService>();
            container.RegisterType<IProfileService, ProfileService>();
            container.RegisterType<IMacrosService, MacrosService>();
            container.RegisterType<IFoodService, FoodService>();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);

            DependencyResolver.SetResolver(new Unity.Mvc5.UnityDependencyResolver(container));
        }
    }
}