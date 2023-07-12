import httpStatus from "http-status";
export const responseWithFormatter = (response, body) => {
  const status = body.code || httpStatus.OK;
  
  response.status(status).json({
    code: status,
    message: body.message,
    data: body.data
  })
}