import "dotenv/config";
import express from "express";
import cors from "cors";
import auth from "./route/auth.route.js";
import user from "./route/user.route.js";
import tokenAuth from "./middleware/tokenAuth.js";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send('welcome to the token authentication system, please visit https://github.com/Ebunwadi/zuriTask-Repo/edit/main/task3 for a complete description of the app')
});

app.use("/auth", auth);
app.use("/user", tokenAuth, user);

export default app.listen(port, () => {
  console.log(`The Server is running at http://localhost:${port}`);
});
