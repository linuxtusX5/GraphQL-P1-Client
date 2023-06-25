import express from 'express';
import cors from 'cors';
const app = express();
import dotenv from 'dotenv';

dotenv.config();

app.use(express.json())
app.use(cors({
    credentials: true
}))

const PORT = process.env.PORT || 1337

app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} Port ${PORT}`)
})