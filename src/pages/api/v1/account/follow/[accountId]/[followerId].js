import dbConnect from "src/lib/dbConnect";
import {withSessionRoute} from "src/lib/middlewares/withSession";
import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import accountService from "src/lib/services/accountService";

async function handler(req, res) {
  try {
    const {accountId, followerId} = req.query;
    await dbConnect();
    
    const account = await accountService.toggleFollowing({
      accountId, followerId
    })
    
    req.session.account = account;
    
    await req.session.save();
    
    res.json({
      code: 200,
      data: account,
      message: 'Get successfully followed users'
    })
  } catch (e) {
    console.log(e);
  }
}

export default withApiErrorHandler(withSessionRoute(handler));