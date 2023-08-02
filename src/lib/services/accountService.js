import {AccountModel} from "src/lib/models/account.model";

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
}


const accountService = new AccountService();

export default accountService;