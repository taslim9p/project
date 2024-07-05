import mongoose from "mongoose"

const connectDB=async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongodb database ${conn.connection.host}`);

    }catch(error){
        console.log('erroe');
    }
};

export default connectDB;