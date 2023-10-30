

import dbConnect from "src/lib/dbConnect";
import {withSessionRoute} from "src/lib/middlewares/withSession";
import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import accountService from "src/lib/services/accountService";

async function handler(req, res) {
  try {
    const {accountId} = req.query;
    await dbConnect();
    
    const followingAccounts = await accountService.getFollowing({accountId});
    
    res.json({
      code: 200,
      data: followingAccounts,
      message: 'Get successfully followed users'
    })
  } catch (e) {
    console.log(e);
  }
}

export default withApiErrorHandler(withSessionRoute(handler));