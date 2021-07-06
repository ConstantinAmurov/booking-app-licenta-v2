require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//conectare MONGODB
const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://admin:costel079616617@cluster0.rvuou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.log("Error connecting with error code:", err);
  });
const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("Mongo DB connect success");
// });

const authRouter = require("./routes/auth");
const CompanyRouter = require("./routes/companies");

app.use("/api/auth", authRouter);
app.use("/api/companies", CompanyRouter);

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile("client/build");
});

app.listen(port, () => {
  console.log(`Example app listening on port port!`);
});
