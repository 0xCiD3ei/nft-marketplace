
export class ApiError extends Error {
  code = 0;
  
  constructor(detail) {
    super(detail.message);
    this.code = detail.code;
    this.message = detail.message;
  }
}