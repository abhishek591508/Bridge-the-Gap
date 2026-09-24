const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);//OMG use the '/api/auth' do not use 'api/auth', very important improvement

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    message: "JanSetu Backend is running"
  });
});

//connectDB(); is asynchronous.
//A more robust startup pattern is to make the startup process wait for the database connection before declaring the application ready.

//The await means:
// "Don't continue to the next line until the database connection is finished."
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server");
  }
};

startServer();