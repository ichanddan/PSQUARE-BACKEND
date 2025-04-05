const express = require("express");
const connectDB = require("./config/db");
const mainRouter = require("./router/index");
const cors = require("cors");
const app = express();

app.use(express.json());
connectDB();

app.use(cors({
  origin: "*",
}));
app.use("/api", mainRouter);



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
