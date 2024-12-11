import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import ConnectDb from './config/db.js';
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'

const app = express();
dotenv.config();

app.get("/", (req, res) => {
    res.send("<h1>HI WELCOME<h1>");
})

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes)

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`got connected to ${PORT}`.green);
})
ConnectDb();