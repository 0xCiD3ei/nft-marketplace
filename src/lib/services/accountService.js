import {AccountModel} from "src/lib/models/account.model";
import {ApiError} from "src/lib/errors/ApiError";

class AccountService {
  async checkAddressWallet(address) {
    let account = await AccountModel.findOne({address});
    
    if(!account) {
      account = await AccountModel.create({address});
    }
    
    return account;
  }
  
  async getAccountByAddress(address) {
    const account = await AccountModel.findOne({address});
    
    return account;
  }
  
  async updateProfile(payload){
    const updatedAccount = await AccountModel.findByIdAndUpdate(
      payload.id,
      { $set: payload.data },
      { new: true }
    );
    
    if (!updatedAccount) {
      throw ApiError({
        code: 400,
        message: "Account not found"
      });
    }
    
    return updatedAccount;
  }
}


const accountService = new AccountService();

export default accountService;