import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

const app = express();
dotenv.config();

app.get("/", (req, res) => {
    res.send("<h1>HI WELCOME<h1>");
})

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`got connected to ${PORT}`.green);
})