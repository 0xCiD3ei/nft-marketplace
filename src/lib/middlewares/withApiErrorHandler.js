import {ApiError} from "src/lib/errors/ApiError";

export default function withApiErrorHandler(fn) {
  return async (req, res)=> {
    try {
      return await fn(req, res)
    }catch (e) {
      console.log(e);
      if(e instanceof ApiError) {
        res.json({
          code: e.code,
          message: e.message
        })
      }else {
        res.json({
          code: 500,
          message: 'Unknown error'
        })
      }
    }
  }
}