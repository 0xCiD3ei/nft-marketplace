import dbConnect from "src/lib/dbConnect";
import {withSessionRoute} from "src/lib/middlewares/withSession";
import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import categoryService from "src/lib/services/categoryService";
import {responseWithFormatter} from "src/lib/utils/response";

async function getCategoriesRoute(req, res) {
  await dbConnect();
  if(req.method === "GET") {
    const data = await categoryService.getCategories();
    
    responseWithFormatter(res, {data});
  }
}

export default withSessionRoute(withApiErrorHandler(getCategoriesRoute));