import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import {withSessionRoute} from "src/lib/middlewares/withSession";
import dbConnect from "src/lib/dbConnect";

async function userProfileRoute(req, res) {
  await dbConnect();
  const user = await req.session.user;
  
  return res.json({
    code: 200,
    data: user,
    message: 'Get profile successfully'
  });
}

export default withApiErrorHandler(withSessionRoute(userProfileRoute))