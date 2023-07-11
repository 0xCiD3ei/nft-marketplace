import {withSessionRoute} from "src/lib/middlewares/withSession";
import dbConnect from "src/lib/dbConnect";
import categoryService from "src/lib/services/categoryService";
import {z} from "zod";
import {ApiError} from "src/lib/errors/ApiError";
import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";

const CategoriesCreateSchema = z.object({
  name: z.string().min(1, 'Category name required'),
  description: z.string().min(1, 'Category description required'),
  image: z.string().min(1, 'Image name required')
})
async function categoriesCreateRoute(req, res) {
  try {
    CategoriesCreateSchema.parse(req.body);
  }catch (e) {
    console.log(e)
    throw new ApiError({
      code: 503,
      message: e.error[0].message,
    })
  }
  
  await dbConnect();
  
  await categoryService.create({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    totalBalance: 0,
    totalItems: 0
  })
  
  res.json({
    code: 200,
    message: 'Creation success'
  })
}

export default withSessionRoute(withApiErrorHandler(categoriesCreateRoute));