const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes.js");
const adminRouter = require("./routes/adminRoutes.js");
const productRouter = require("./routes/productRoutes.js");
const categoryRouter = require("./routes/categoryRoutes.js");
const cartRouter = require("./routes/cartRoutes.js");
const orderRouter = require("./routes/orderRoutes.js");

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173", "https://arp-mern-ecom.netlify.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api", adminRouter);
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", cartRouter);
app.use("/api", orderRouter);

const PORT = 8080 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
