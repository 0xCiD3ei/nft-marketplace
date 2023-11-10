import {withSessionRoute} from "src/lib/middlewares/withSession";
import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import dbConnect from "src/lib/dbConnect";
import approveService from "src/lib/services/approveService";

async function handler(req, res) {
  
  await dbConnect();
  
  await approveService.grantRole(req.body);
  
  res.json({
    code: 200,
    message: "Grant the role successfully"
  });
}

export default withSessionRoute(withApiErrorHandler(handler));