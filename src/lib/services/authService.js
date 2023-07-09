import {UserModel} from "src/lib/models/user.model";
import {ApiError} from "src/lib/errors/ApiError";
import {compareSync, hashSync} from "bcrypt";
import {z} from "zod";

const PasswordValidation = z.string().min(8, 'Password length error');

class AuthService {
  async register(payload) {
    const oldUser = UserModel.exists({
      email: payload.email
    })
    
    if(oldUser) throw new ApiError({
      code: 504,
      message: 'User already exists'
    })
    
    const user =await UserModel.create({
      email: payload.email,
      password: hashSync(payload.password, 10)
    })
    
    if(!user) throw new ApiError({
      code: 503,
      message: 'User creation failed'
    })
    
    return user;
  }
  
  async login(payload) {
    const user =await UserModel.findOne({
      email: payload.email
    })
    
    if(!user) {
      throw new ApiError({
        code: 400,
        message: 'Invalid credentials'
      })
    }else {
      if(compareSync(payload.password, user.password)) {
        delete user.password;
        return user;
      }else throw new ApiError({
        code: 400,
        message: 'Invalid credentials'
      })
    }
  }
}

export default new AuthService();