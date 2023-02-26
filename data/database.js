import mongoose from "mongoose";

export const connectDB=async()=>{
    try {
        mongoose.set('strictQuery', false);
      const conn = await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
      useUnifiedTopology: true,
        dbName:"mango"
      });
      
      console.log(`Server connected to database ${conn.connection.host}`);
    } catch (error) {
        console.log("Some Error Occurred",error);
        process.exit(1);
    }
}

