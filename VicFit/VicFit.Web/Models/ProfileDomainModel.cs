using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace VicFit.Web.Models
{
    public class ProfileDomainModel
    {
        public int Id { get; set; }
        public int Height { get; set; }
        public int CurrentWeight { get; set; }
        public int GoalWeight { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public int GoalId { get; set; }
        public decimal Activity { get; set; }
        public string UserId { get; set; }
    }
}