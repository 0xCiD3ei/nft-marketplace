import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import {withSessionRoute} from "src/lib/middlewares/withSession";
import dbConnect from "src/lib/dbConnect";

async function handler(req, res) {
  await dbConnect();
  const account = await req.session.account;
  
  return res.json({
    code: 200,
    data: account,
    message: 'Get information successfully'
  });
}

export default withApiErrorHandler(withSessionRoute(handler))