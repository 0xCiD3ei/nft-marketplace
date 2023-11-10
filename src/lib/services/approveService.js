import {ApproveModel} from "src/lib/models/approve.model";
import {AccountModel} from "src/lib/models/account.model";
import {ApiError} from "src/lib/errors/ApiError";

class ApproveService {
  grantRole (payload) {
    return ApproveModel.create(payload);
  }
  
  async revokeRole (payload) {
    const {address} = payload;
    
    const user = await AccountModel.findOne({address});
    if(!user) {
      throw ApiError({
        code: 404,
        message: 'Account not found'
      })
    }
    
    await ApproveModel.deleteOne({ address });
    
    return {
      success: true,
      message: 'Account revoked successfully'
    };
  }
  
  async getAccountsRole () {
    return await ApproveModel.find({});
  }
}

const approveService = new ApproveService();

export default approveService;