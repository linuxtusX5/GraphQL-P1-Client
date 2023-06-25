import express from 'express';
import cors from 'cors';
const app = express();
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';
import DB from '../config/connectDB';
import colors from 'colors'

dotenv.config();
DB();

app.use(express.json())
app.use(cors({
    credentials: true
}))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.DEV_MODE === 'development' 
}))
const PORT = process.env.PORT || 1337

app.listen(PORT, () => {
    console.log(colors.cyan(`Server running on ${process.env.DEV_MODE} Port ${PORT}`))
})