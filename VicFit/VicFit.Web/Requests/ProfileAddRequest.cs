using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace VicFit.Web.Requests
{
    public class ProfileAddRequest
    {
        [Required]
        public int Height { get; set; }
        [Required]
        public int CurrentWeight { get; set; }
        [Required]
        public int GoalWeight { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public int GoalId { get; set; }
        [Required]
        public decimal Activity { get; set; }
        [Required]
        public string UserId { get; set; }
    }
}