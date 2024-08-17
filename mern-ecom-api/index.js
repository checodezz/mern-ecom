const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes.js");
const adminRouter = require("./routes/adminRoutes.js");

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api", adminRouter);

const PORT = 8080 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
