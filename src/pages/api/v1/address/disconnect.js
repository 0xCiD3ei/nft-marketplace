import dbConnect from "src/lib/dbConnect";
import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import {withSessionRoute} from "src/lib/middlewares/withSession";

async function handler(req, res) {
  await dbConnect();
  
  if(req.method === 'POST') {
    await req.session.destroy();
  }
  
  res.json({
    code: 200,
    message: 'Disconnect wallet success'
  })
}

export default withApiErrorHandler(withSessionRoute(handler));