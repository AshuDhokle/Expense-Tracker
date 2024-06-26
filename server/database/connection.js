import dotenv from 'dotenv'
import Mongoose from "mongoose";

dotenv.config();

const server = `mongodb+srv://${process.env.MONGOOSE_USERNAME}:${process.env.MONGOOSE_PASSWORD}@expernsetracker.rvtfpsc.mongodb.net/`

class Database{
    constructor(){
        this._connection();
    }

    _connection(){
        Mongoose.connect(server)
        .then(()=>{
            console.log('Database connnected');
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}

const Connection = new Database();
export {Connection}
