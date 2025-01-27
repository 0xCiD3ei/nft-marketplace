import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import {withSessionRoute} from "src/lib/middlewares/withSession";
import dbConnect from "src/lib/dbConnect";
import nftService from "src/lib/services/nftService";

async function handler(req, res) {
  
  const search = req.params;
  await dbConnect();
  try {
    const nfts = await nftService.searchNFTs(search);
    
    res.json({
      code: 200,
      data: {
        nfts: nfts
      },
      message: 'Get nfts successfully'
    })
  }
  catch (e) {
    console.log(e);
  }
}

export default withApiErrorHandler(withSessionRoute(handler))