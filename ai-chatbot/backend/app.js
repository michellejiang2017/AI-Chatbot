import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = 5001;

app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Backend running!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});