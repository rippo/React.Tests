using System.Collections.Generic;
using System.Linq;
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
                new {id = 2, value = "two" },
                new {id = 3, value = "three" },
                new {id = 4, value = "four" }
            };

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Lookup2(int id)
        {
            var model = new List<dynamic>
            {
                new {id = 21, lookupid = 1, value = "one.1"},
                new {id = 22, lookupid = 1, value = "one.2" },
                new {id = 23, lookupid = 1, value = "one.3" },
                new {id = 24, lookupid = 2, value = "two.1" },
                new {id = 25, lookupid = 2, value = "two.2" },
                new {id = 26, lookupid = 3, value = "three.1" },
                new {id = 27, lookupid = 4, value = "four.1" },
                new {id = 28, lookupid = 4, value = "four.2" },
                new {id = 29, lookupid = 4, value = "four.3" }
            }.Where(w=>w.lookupid == id);

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AdditionalInfo(int id)
        {
            var model = new List<dynamic>
            {
                new {id = 41, lookupid = 1, drink = "coffee", container = "cup"},
                new {id = 42, lookupid = 2, drink = "tea", container = "mug" },
                new {id = 43, lookupid = 3, drink = "chocolate", container = "mug" },
                new {id = 44, lookupid = 4, drink = "peppermint", container = "cup" },
            }.FirstOrDefault(w => w.lookupid == id);

            return Json(model, JsonRequestBehavior.AllowGet);
        }

    }
}