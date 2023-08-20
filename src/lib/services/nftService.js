import {NftModel} from "src/lib/models/nft.model";

class nftService {
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
}

export default new nftService();