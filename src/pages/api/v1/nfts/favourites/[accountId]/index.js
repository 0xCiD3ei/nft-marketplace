import dbConnect from "src/lib/dbConnect";
import {withSessionRoute} from "src/lib/middlewares/withSession";
import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import nftService from "src/lib/services/nftService";

async function handler(req, res) {
  try {
    const {accountId} = req.query;
    await dbConnect();
    
    const favourites = await nftService.getFavourites({accountId});
    
    res.json({
      code: 200,
      data: favourites,
      total: favourites.length,
      message: 'Get your favorite successful NFTs'
    })
  } catch (err) {
    console.log(err);
  }
}

export default withApiErrorHandler(withSessionRoute(handler));