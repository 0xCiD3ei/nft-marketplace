import {NftModel} from "src/lib/models/nft.model";
import {ApiError} from "src/lib/errors/ApiError";

class nftService {
  create(payload) {
    return NftModel.create(payload);
  }
  
  getAllNfts () {
    return NftModel.find({});
  }
  
  getNft(id) {
    return NftModel.findById(id)
  }
}

export default new NftService();