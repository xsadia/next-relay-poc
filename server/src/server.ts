import app from "./app";
import { createServer } from "http";
import { connectDB } from "./mongo";

const PORT = process.env.PORT || 4000;
const server = createServer(app.callback());

(async () => {
  await connectDB();
  console.log("mongo connected");
  server.listen(PORT, () => {
    console.log(
      `Server running. Visit http://localhost:${PORT}/graphql/playground`
    );
  });
})();
