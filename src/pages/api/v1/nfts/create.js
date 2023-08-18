import {withSessionRoute} from "src/lib/middlewares/withSession";
import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import dbConnect from "src/lib/dbConnect";
import nftService from "src/lib/services/nftService";

async function createNftRoute(req, res) {
  
  await dbConnect();
  
  await nftService.createNFT(req.body);
  
  res.json({
    code: 200,
    message: "NFT created successfully"});
}

export default withSessionRoute(withApiErrorHandler(createNftRoute));