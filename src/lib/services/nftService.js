import {NftModel} from "src/lib/models/nft.model";
import {ApiError} from "src/lib/errors/ApiError";

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
        { 'metadata.name': { $regex: query, $options: 'i' } }, // Tìm theo tên (không phân biệt hoa thường)
        { 'metadata.description': { $regex: query, $options: 'i' } }, // Tìm theo mô tả (không phân biệt hoa thường)
      ],
    });
    
    return nfts;
  }
  
  getAllNfts () {
    return NftModel.find({});
  }
  
  getNft(id) {
    return NftModel.findById(id)
  }
}

export default new nftService();