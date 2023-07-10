import {withSessionRoute} from "src/lib/withSession";
import dbConnect from "src/lib/dbConnect";
import authService from "src/lib/services/authService";
import withApiErrorHandler from "src/lib/withApiErrorHandler";

async function loginRoute(req, res) {
  await dbConnect();
  req.session.isLoggedIn = true;
  req.session.user =await authService.login(req.body);
  
  await req.session.save();
  
  res.json({
    status: 200,
    message: 'Login success'
  })
}

export default withApiErrorHandler(withSessionRoute(loginRoute));