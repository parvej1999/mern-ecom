import mongoose from "mongoose";
import dotenv from 'dotenv'
import colors from 'colors'

dotenv.config()

const ConnectDb = async () => {
    console.log("connecting the database".magenta)
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`got connected to ${connect.connection.host}`);
    }
    catch (error) {
        console.log(`error: ${error}`);
    }
}

export default ConnectDb;