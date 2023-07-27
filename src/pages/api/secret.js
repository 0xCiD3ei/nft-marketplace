import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    res.status(401).json({ message: "Not authorized." });
    return;
  }
  
  return res.status(200).json({
    message: `This is a secret for ${
      session.user?.address || session.user?.email
    }`,
  });
};

export default handler;