using System.Collections.Generic;
using System.Web.Mvc;

namespace React.Test.Controllers
{
    public class AjaxController : Controller
    {
        public JsonResult Lookup()
        {
            var model = new List<dynamic>
            {
                new {id = 0, value = "select"},
                new {id = 1, value = "one"},
                new { id = 2, value = "two" },
                new { id = 3, value = "three" },
                new { id = 4, value = "four" }
            };

            return Json(model, JsonRequestBehavior.AllowGet);
        }
    }
}