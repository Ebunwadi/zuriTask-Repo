import { getUserFromDatabase, writeToDatabase } from "../utils/dbService.js";

// @desc getProfile endpoint
// @route POST /user/getProfile
// @access Protected
export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserFromDatabase();
    const foundUser = user.find((user) => user._id === id);
    if (!foundUser)
      return res
        .status(400)
        .json({ message: "User doesnt exist", success: false });
    // remove password from the response being sent to the client
    const { password, ...otherProps } = foundUser;
    return res.status(200).json({
      message: "profile gotten successfully",
      success: true,
      data: otherProps,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc getProfile endpoint
// @route POST /user/postComment
// @access Protected
export const postComment = async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment) {
      return res
        .status(400)
        .json({ success: false, message: "no field must be empty" });
    }
    const { _id } = req.user;
    const user = await getUserFromDatabase();
    const foundUser = user.find((user) => user._id === _id);
    if (!foundUser)
      return res
        .status(401)
        .json({ message: "you cannot post a comment", success: false });
    foundUser.comments.push(comment);
    await writeToDatabase(user);
    return res.status(200).json({
      message: "comment posted successfully",
      success: true,
      data: foundUser.comments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
