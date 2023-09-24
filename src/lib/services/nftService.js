import {NftModel} from "src/lib/models/nft.model";
import {ApiError} from "src/lib/errors/ApiError";
import {AccountModel} from "src/lib/models/account.model";

class NFTService {
  createNFT(payload) {
    return NftModel.create(payload);
  }
  
  findNFTsByCategory(categoryId) {
    const nfts = NftModel.find({ 'metadata.category': categoryId }).populate('metadata.category');
    return nfts;
  }
  
  searchNFTs(query) {
    const nfts = NftModel.find({
      $or: [
        { 'metadata.name': { $regex: query, $options: 'i' } },
        { 'metadata.description': { $regex: query, $options: 'i' } },
      ],
    });
    
    return nfts;
  }
  
  async getAllNfts (page, limit) {
    const options = {
      page: page,
      limit: limit
    };
    const result = await NftModel.paginate({}, options);
    const paginationOptions = {
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
      limit: result.limit,
      nextPage: result.nextPage,
      page: result.page,
      pagingCounter: result.pagingCounter,
      prevPage: result.prevPage,
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
    };
    
    return {
      data: result.docs,
      paginationOptions: paginationOptions,
    };
  }
  
  async checkFavourite(payload) {
    const {accountId, nftId} = payload;
    const nft = await NftModel.findById(nftId);
    if(!nft) {
      throw ApiError({
        code: 404,
        message: 'No NFTs found'
      })
    }
    
    const isFavourite = nft.favorites.includes(accountId);
    
    if(isFavourite) {
      nft.favorites = nft.favorites.filter(userId => userId !== accountId);
    }else {
      nft.favorites.push(accountId);
    }
    
    await nft.save();
    
    return nft;
  }
  
  async getFavourites(payload) {
    const {userId} = payload;
    const user = await AccountModel.findById(userId);
    if(!user) {
      throw ApiError({
        code: 404,
        message: 'Account not found'
      })
    }
    
    const favouritingNFTs = await NftModel.find({ _id: { $in: user.favorites }});
    
    return favouritingNFTs;
  }
}

const nftService = new NFTService();
export default nftService;