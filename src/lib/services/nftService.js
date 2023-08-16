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
  
  getAllNfts () {
    return NftModel.find({});
  }
}

export default new nftService();