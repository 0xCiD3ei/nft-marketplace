import dbConnect from "src/lib/dbConnect";
import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import {withSessionRoute} from "src/lib/middlewares/withSession";
import accountService from "src/lib/services/accountService";

async function handler(req, res) {
  await dbConnect();
  
  const account = await accountService.updateProfile(req.body);
  
  req.session.account = account;
  
  await req.session.save();
  
  return res.json({
    code: 200,
    data: account,
    message: 'Upload profile successfully'
  });
}

export default withApiErrorHandler(withSessionRoute(handler))