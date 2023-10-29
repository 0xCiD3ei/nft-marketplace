import {NftModel} from "src/lib/models/nft.model";
import {ApiError} from "src/lib/errors/ApiError";
import {AccountModel} from "src/lib/models/account.model";

class NFTService {
  createNFT(payload) {
    return NftModel.create(payload);
  }
  
  async getNFTById(payload) {
    const nft = await NftModel.findOne({
      'metadata.id': payload.nft
    });
    return nft;
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
    const nft = await NftModel.findOne({
      'metadata.id': nftId
    });
    if(!nft) {
      throw ApiError({
        code: 404,
        message: 'No NFTs found'
      })
    }
    
    const isFavourite = nft.favorites.includes(accountId);
    let message = '';
    
    if(isFavourite) {
      nft.favorites = nft.favorites.filter(userId => userId !== accountId);
      message = 'Successfully unfavored NFT';
    }else {
      nft.favorites.push(accountId);
      message = 'Favourite a successful NFT';
    }
    
    await nft.save();
    
    return {nft, message};
  }
  
  async getFavourites(payload) {
    const {accountId} = payload;
    const user = await AccountModel.findById(accountId);
    if(!user) {
      throw ApiError({
        code: 404,
        message: 'Account not found'
      })
    }
    
    const favouritingNFTs = await NftModel.find({ favorites: { $in: user._id }});
    
    return favouritingNFTs;
  }
}

const nftService = new NFTService();
export default nftService;