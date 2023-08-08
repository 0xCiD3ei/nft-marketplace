import withApiErrorHandler from "src/lib/middlewares/withApiErrorHandler";
import {withSessionRoute} from "src/lib/middlewares/withSession";
import dbConnect from "src/lib/dbConnect";
import favouriteService from "src/lib/services/favouriteService";

async function handler(req, res) {
  await dbConnect();
  const isFavorite = await favouriteService.checkFavourite(req.body);
  
  return res.json({
    code: 200,
    isFavorite: isFavorite
  });
}

export default withApiErrorHandler(withSessionRoute(handler))