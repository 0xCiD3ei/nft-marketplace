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
  
  async toggleFollowing(payload) {
    const { accountId, followerId } = payload;
    const accountToFollow = await AccountModel.findById(followerId);
    if (!accountToFollow) {
      throw ApiError({
        code: 404,
        message: "No account found to follow"
      })
    }
    
    const followerAccount = await AccountModel.findById(accountId);
    if (!followerAccount) {
      throw ApiError({
        code: 404,
        message: "No follower accounts found"
      })
    }
    
    const isFollowing = followerAccount.followedUsers.includes(followerId);
    
    if (isFollowing) {
      followerAccount.followedUsers = followerAccount.followedUsers.filter(userId => userId !== followerId);
    } else {
      followerAccount.followedUsers.push(followerId);
    }
    
    await followerAccount.save();
    
    return followerAccount;
  }
  
  async getFollowers(payload) {
    const { accountId } = payload;
    const account = await AccountModel.findById(accountId);
    if (!account) {
      throw ApiError({
        code: 404,
        message: "Account not found"
      })
    }
    const followingAccounts = await AccountModel.find({ _id: { $in: account.followedUsers } });
    
    return followingAccounts;
  }
  
  async getAccounts() {
    const accounts = await AccountModel.find({});
    
    return accounts;
  }
}


const accountService = new AccountService();

export default accountService;