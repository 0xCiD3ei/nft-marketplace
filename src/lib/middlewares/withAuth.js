import {withSessionRoute} from "src/lib/middlewares/withSession";
import {ApiError} from "src/lib/errors/ApiError";
import dbConnect from "src/lib/dbConnect";

export default function withAuth(fn) {
  return withSessionRoute(async (req, res) => {
    const session = req.session;
    
    if(!session.isLoggedIn) throw new ApiError({
      code: 400,
      message: 'Unauthorized'
    })
    
    await dbConnect();
    
    return await fn(req, res);
  })
}