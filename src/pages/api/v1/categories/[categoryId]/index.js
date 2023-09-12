import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import {withSessionRoute} from "src/lib/middlewares/withSession";
import dbConnect from "src/lib/dbConnect";
import CategoryService from "src/lib/services/categoryService";
import {responseWithFormatter} from "src/lib/utils/response";

async function getCategoryById (req, res) {
  await dbConnect();
  const id = req.query.categoryId;
  const data = await CategoryService.getCategory(id);
  
  responseWithFormatter(res, {
    data
  })
}

export default withSessionRoute(withApiErrorHandler(getCategoryById));