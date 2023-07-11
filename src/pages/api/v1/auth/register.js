import {withSessionRoute} from "src/lib/middlewares/withSession";
import dbConnect from "src/lib/dbConnect";
import authService from "src/lib/services/authService";
import {z} from "zod";
import {ApiError} from "src/lib/errors/ApiError";
import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";


const RegisterSchema  = z.object({
  email: z.string().min(1, 'Email required').email('Invalid email'),
  password: z.string().min(8, 'Password length error'),
})

async function registerRoute(req, res) {
  try {
    RegisterSchema.parse(req.body);
  }catch (e) {
    console.log(e);
    throw new ApiError({
      code: 503,
      message: e.errors[0].message,
    })
  }
  
  await dbConnect();
  
  const user = await authService.register(req.body);
  if(user) req.session.user = user;
  await req.session.save();
  
  res.json({
    code: 200,
    message: 'Registration success'
  })
}

export default withSessionRoute(withApiErrorHandler(registerRoute));

