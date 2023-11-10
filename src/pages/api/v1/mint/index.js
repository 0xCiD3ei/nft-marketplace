import {withSessionRoute} from "src/lib/middlewares/withSession";
import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import dbConnect from "src/lib/dbConnect";
import approveService from "src/lib/services/approveService";

async function handler(req, res) {
  
  await dbConnect();
  
  const accounts = await approveService.getAccountsRole();
  
  res.json({
    code: 200,
    data: accounts,
  });
}

export default withSessionRoute(withApiErrorHandler(handler));