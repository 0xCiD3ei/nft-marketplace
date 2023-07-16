import {withSessionRoute} from "src/lib/middlewares/withSession";
import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import dbConnect from "src/lib/dbConnect";

async function createNftRoute(req, res) {
  await dbConnect();
}

export default withSessionRoute(withApiErrorHandler(createNftRoute));