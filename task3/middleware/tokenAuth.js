import jwt from "jsonwebtoken";
import { getUserFromDatabase } from "../utils/dbService.js";

export default (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }

  const token = authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Unauthorized", success: false });
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, async (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Forbidden", success: false });
    //get user from the database
    const user = await getUserFromDatabase();
    const foundUser = user.find((user) => user._id === decoded.id);
    if (!foundUser)
      return res.status(401).json({ message: "Unauthorized", success: false });
    req.user = foundUser;
    next();
  });
};
