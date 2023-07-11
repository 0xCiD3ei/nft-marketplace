import dbConnect from "src/lib/dbConnect";
import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import withAuth from "src/lib/middlewares/withAuth";

async function logoutRoute(req, res) {
  await dbConnect();
  
  if(req.method === 'POST') {
    await req.session.destroy();
  }
  
  res.json({
    code: 200,
    message: 'Logout success'
  })
}

export default withApiErrorHandler(withAuth(logoutRoute));