import { promises as fs } from "fs";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getUserFromDatabase = async () => {
  const users = await fs.readFile(
    path.join(__dirname, "../database/db.json"),
    "utf-8",
  );
  return JSON.parse(users);
};

export const writeToDatabase = async (user) => {
  const writeFile = await fs.writeFile(
    path.join(__dirname, "../database/db.json"),
    JSON.stringify(user),
  );
  return writeFile;
};
