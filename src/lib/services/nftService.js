import {NftModel} from "src/lib/models/nft.model";
import {ApiError} from "src/lib/errors/ApiError";
import {AccountModel} from "src/lib/models/account.model";
import {CategoryModel} from "src/lib/models/category.model";

class NFTService {
	async createNFT(payload) {
		const newNFT = await NftModel.create(payload);
		const categoryId = payload.metadata.category;
		const increaseValue = 1;
		await CategoryModel.findByIdAndUpdate(categoryId, {$inc: {totalItems: increaseValue}});
		return newNFT;
	}
	
	async getNFTById(payload) {
		const nft = await NftModel.findOne({
			'metadata.id': payload.nft
		});
		
		return nft;
		
		// const addressTransaction = nft?.transaction.map(tran => tran.address);
		//
		// const populatedAddresses = await AccountModel.find({address: {$in: addressTransaction}});
		//
		// const addressMap = new Map(populatedAddresses.map(address => [address._id.toString(), address]));
		//
		// const nftsWithPopulatedAddress = nft?.transaction?.map(nft => ({
		// 	...nft.toObject(),
		// 	metadata: {
		// 		...nft.metadata.toObject(),
		// 		category: addressMap.get(nft.metadata.category.toString())
		// 	}
		// }));
		//
		// return nftsWithPopulatedAddress;
	}
	
	findNFTsByCategory(categoryId) {
		const nfts = NftModel.find({'metadata.category': categoryId}).populate('metadata.category');
		return nfts;
	}
	
	searchNFTs(query) {
		const nfts = NftModel.find({
			$or: [
				{'metadata.name': {$regex: query, $options: 'i'}},
				{'metadata.description': {$regex: query, $options: 'i'}},
			],
		});
		
		return nfts;
	}
	
	async getAllNfts(page, limit) {
		const options = {
			page: page,
			limit: limit,
			sort: {_id: -1}
		};
		
		try {
			const paginatedResult = await NftModel.paginate({}, options);
			
			const nfts = paginatedResult.docs;
			
			const categoryIds = nfts.map(nft => nft.metadata.category);
			
			const populatedCategories = await CategoryModel.find({_id: {$in: categoryIds}});
			
			const categoryMap = new Map(populatedCategories.map(category => [category._id.toString(), category]));
			
			const nftsWithPopulatedCategories = nfts.map(nft => ({
				...nft.toObject(),
				metadata: {
					...nft.metadata.toObject(),
					category: categoryMap.get(nft.metadata.category.toString())
				}
			}));
			
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
				data: nftsWithPopulatedCategories,
				paginationOptions: paginationOptions,
			};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
	
	async checkFavourite(payload) {
		const {accountId, nftId} = payload;
		const nft = await NftModel.findOne({
			'metadata.id': nftId
		});
		if (!nft) {
			throw ApiError({
				code: 404,
				message: 'No NFTs found'
			})
		}
		
		const isFavourite = nft.favorites.includes(accountId);
		let message = '';
		
		if (isFavourite) {
			nft.favorites = nft.favorites.filter(userId => userId !== accountId);
			message = 'Successfully unfavored NFT';
		} else {
			nft.favorites.push(accountId);
			message = 'Favourite a successful NFT';
		}
		
		await nft.save();
		
		return {nft, message};
	}
	
	async getFavourites(payload) {
		const {accountId} = payload;
		const user = await AccountModel.findById(accountId);
		if (!user) {
			throw ApiError({
				code: 404,
				message: 'Account not found'
			})
		}
		
		const favouritingNFTs = await NftModel.find({favorites: {$in: user._id}});
		
		return favouritingNFTs;
	}
	
	async addTransaction(payload) {
		console.log(payload);
		const {nftId, data} = payload;
		const nft = await NftModel.findOne({'metadata.id': nftId});
		
		if (!nft) {
			throw ApiError({
				code: 404,
				message: 'NFT not found'
			})
		}
		
		nft.transaction.push(data);
		
		await nft.save();
		
		
		console.log('nft', nft);
		
		return nft;
	}
	
	async deleteAllTransaction(payload) {
		const {nftId} = payload;
		const nft = await NftModel.findOne({'metadata.id': nftId});
		
		if (!nft) {
			throw ApiError({
				code: 404,
				message: 'NFT not found'
			})
		}
		
		nft.transaction = [];
		
		await nft.save();
		
		return nft;
	}
}

const nftService = new NFTService();
export default nftService;