import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getUserFromDatabase, writeToDatabase } from "../utils/dbService.js";

// @desc register endpoint
// @route POST /auth/register
// @access Public
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "no field must be empty" });
    }
    const users = await getUserFromDatabase();
    // username must be unique
    const checkUser = users.find((user) => user.username === username);
    if (checkUser) {
      return res
        .status(400)
        .json({ success: false, message: "user already exists" });
    }
    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10);
    // store users in the db
    users.push({
      ...req.body,
      _id: uuidv4(),
      password: hashedPwd,
      comments: [],
    });
    await writeToDatabase(users);
    return res.status(201).json({ success: true, message: "user created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc login endpoint
// @route POST /auth/login
// @access Public
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "no field must be empty" });
    }
    // check if user exist in db
    const users = await getUserFromDatabase();
    const checkUser = users?.find((user) => user.username === username);
    if (!checkUser)
      return res
        .status(400)
        .json({ success: false, message: "username or password is incorrect" });
    // check if passwords match
    const match = await bcrypt.compare(password, checkUser.password);
    if (!match)
      return res
        .status(400)
        .json({ message: "username or password is incorrect", success: false });
    // create a token
    const token = jwt.sign(
      { id: checkUser._id },
      process.env.JWT_TOKEN_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return res
      .status(200)
      .json({ message: "login successfull", success: true, data: token });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
