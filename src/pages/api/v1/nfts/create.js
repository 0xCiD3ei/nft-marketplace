import {withSessionRoute} from "src/lib/middlewares/withSession";
import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import dbConnect from "src/lib/dbConnect";
import nftService from "src/lib/services/nftService";
import z from "zod";
import {ApiError} from "src/lib/errors/ApiError";

const NFTCreateSchema = z.object({
  name: z.string().min(1, "NFT name is required"),
  description: z.string().min(1, "NFT description is required"),
  image: z.string().min(1),
  price: z.string().min(1, "NFT price is required"),
  category: z.string(),
  owner: z.string(),
})

async function createNftRoute(req, res) {
  
  try {
    NFTCreateSchema.parse(req.body);
  }catch (e) {
    console.log(e)
    throw new ApiError({
      code: 503,
      message: e.error[0].message,
    })
  }
  
  await dbConnect();
  
  await nftService.createNFT({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
    category: req.body.category,
    owner: req.body.owner,
  });
  
  res.json({
    code: 200,
    message: "NFT created successfully"});
}

export default withSessionRoute(withApiErrorHandler(createNftRoute));