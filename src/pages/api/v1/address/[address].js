import dbConnect from "src/lib/dbConnect";
import {withSessionRoute} from "src/lib/middlewares/withSession";
import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import accountService from "src/lib/services/accountService";

async function handler(req, res) {
  try {
    const {address} = req.query;
    console.log({address});
    await dbConnect();
    
    req.session.account = await accountService.checkAddressWallet(address);

    await req.session.save();

    res.json({
      code: 200,
      message: 'Connect wallet success'
    })
  }catch (e) {
    console.log(e);
  }
}

export default withApiErrorHandler(withSessionRoute(handler));