import dbConnect from "src/lib/dbConnect";
import {withSessionRoute} from "src/lib/middlewares/withSession";
import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import nftService from "src/lib/services/nftService";

async function handler(req, res) {
  try {
    const {accountId, nftId} = req.query;
    await dbConnect();
    console.log({accountId, nftId});
    const nft = await nftService.checkFavourite({accountId, nftId});
    
    res.json({
      code: 200,
      data: nft,
      message: 'Favourite a successful NFT'
    })
  }catch (e) {
    console.log(e);
  }
}

export default withApiErrorHandler(withSessionRoute(handler));