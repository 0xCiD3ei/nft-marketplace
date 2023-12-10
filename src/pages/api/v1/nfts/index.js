import {withSessionRoute} from "src/lib/middlewares/withSession";
import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import dbConnect from "src/lib/dbConnect";
import nftService from "src/lib/services/nftService";

async function handler(req, res) {
	
	await dbConnect();
	
	const result = await nftService.getAllNfts(1, 99);
	
	res.json({
		code: 200,
		data: result.data,
		paginationOptions: result.paginationOptions,
		message: "Get NFTs successfully"
	});
}

export default withSessionRoute(withApiErrorHandler(handler));