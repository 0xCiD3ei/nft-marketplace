import {FavouriteModel} from "src/lib/models/favourite.model";

class FavouriteService {
  async checkFavourite(id, address) {
    const favourite = await FavouriteModel.findOne({id});
    
    if(!favourite) {
      await FavouriteModel.create({ id, address: [address] });
    } else {
      const addressIndex = favourite.address.indexOf(address);
      
      if (addressIndex === -1) {
        favourite.address.push(address);
        await favourite.save();
        return true;
      } else {
        favourite.address.splice(addressIndex, 1);
        await favourite.save();
        return false;
      }
    }
    
    return true;
  }
  
  async getFavouriteByAddress(address) {
    const favourites = await FavouriteModel.find({ address: { $in: [address] } });
    
    return favourites;
  }
}

const favouriteService = new FavouriteService();

export default favouriteService;