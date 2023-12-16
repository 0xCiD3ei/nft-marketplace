import {AccountModel} from "src/lib/models/account.model";
import {ApiError} from "src/lib/errors/ApiError";

class AccountService {
	async checkAddressWallet(address) {
		let account = await AccountModel.findOne({address});
		
		if (!account) {
			account = await AccountModel.create({address});
		}
		
		return account;
	}
	
	async getAccountByAddress(address) {
		const account = await AccountModel.findOne({address});
		
		return account;
	}
	
	async updateProfile(payload) {
		const updatedAccount = await AccountModel.findByIdAndUpdate(
			payload.id,
			{$set: payload.data},
			{new: true}
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
		const {accountId, followerId} = payload;
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
	
	async getFollowing(payload) {
		const {accountId} = payload;
		const account = await AccountModel.findById(accountId);
		if (!account) {
			throw ApiError({
				code: 404,
				message: "Account not found"
			})
		}
		const followingAccounts = await AccountModel.find({_id: {$in: account.followedUsers}});
		
		return followingAccounts;
	}
	
	async getAccounts(page, limit) {
		try {
			const options = {
				page: page,
				limit: limit,
				sort: {_id: -1}
			};
			const paginatedResult = await AccountModel.paginate({}, options);
			
			const accounts = paginatedResult.docs;
			
			const paginationOptions = {
				hasNextPage: paginatedResult.hasNextPage,
				hasPrevPage: paginatedResult.hasPrevPage,
				limit: paginatedResult.limit,
				nextPage: paginatedResult.nextPage,
				page: paginatedResult.page,
				pagingCounter: paginatedResult.pagingCounter,
				prevPage: paginatedResult.prevPage,
				totalDocs: paginatedResult.totalDocs,
				totalPages: paginatedResult.totalPages,
			};
			
			return {
				data: accounts,
				paginationOptions: paginationOptions,
			};
		} catch (e) {
			console.log(e);
		}
	}
	
	async getFollowers(payload) {
		const {accountId} = payload;
		const account = await AccountModel.findById(accountId);
		if (!account) {
			throw ApiError({
				code: 404,
				message: "Account not found"
			})
		}
		try {
			const followerAccounts = await AccountModel.find({followedUsers: {$in: accountId}});
			
			return followerAccounts;
		} catch (error) {
			throw ApiError({
				code: 500,
				message: 'Error fetching accounts by followed users: ' + error.message
			});
		}
	}
}


const accountService = new AccountService();

export default accountService;