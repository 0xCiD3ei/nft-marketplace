import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import {withSessionRoute} from "src/lib/middlewares/withSession";
import dbConnect from "src/lib/dbConnect";
import nftService from "src/lib/services/nftService";

async function handler(req, res) {
  
  const nftId = req.query;
  await dbConnect();
  try {
    const nft = await nftService.getNFTById(nftId);
    
    res.json({
      code: 200,
      data: {
        nft: nft
      },
      message: 'Get nft successfully'
    })
  }
  catch (e) {
    console.log(e);
  }
}

export default withApiErrorHandler(withSessionRoute(handler))