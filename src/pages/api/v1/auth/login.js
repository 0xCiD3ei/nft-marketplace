 import {withSessionRoute} from "src/lib/middlewares/withSession";
import dbConnect from "src/lib/dbConnect";
import authService from "src/lib/services/authService";
import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";

async function loginRoute(req, res) {
  await dbConnect();
  req.session.isLoggedIn = true;
  req.session.user =await authService.login(req.body);
  
  await req.session.save();
  
  res.json({
    code: 200,
    message: 'Login success'
  })
}

export default withApiErrorHandler(withSessionRoute(loginRoute));
