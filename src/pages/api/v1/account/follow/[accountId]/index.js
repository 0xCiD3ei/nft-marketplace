import dbConnect from "src/lib/dbConnect";
import {withSessionRoute} from "src/lib/middlewares/withSession";
import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import accountService from "src/lib/services/accountService";

async function handler(req, res) {
  try {
    const {accountId} = req.query;
    await dbConnect();
    
    const followerAccounts = await accountService.getFollowers({accountId});
    
    res.json({
      code: 200,
      data: followerAccounts,
      message: 'Get successfully following users'
    })
  } catch (e) {
    console.log(e);
  }
}

export default withApiErrorHandler(withSessionRoute(handler));