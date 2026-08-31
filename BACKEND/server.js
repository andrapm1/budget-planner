const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require ("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
 const spendingsRoutes = require("./routes/spendingsRoutes");
 const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use (
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/spendings", spendingsRoutes);
app.use("/api/v1/dashboard", require("./routes/dashboardRoutes"));


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require('mongoose');
mongoose.set('debug', true);
