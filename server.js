import  express  from "express"
import dotenv from 'dotenv'
import morgan  from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'


//configure env
dotenv.config();

//database config
connectDB();

const app=express()

//middleware
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth',authRoutes)


//rest api

app.get('/',(req,res)=>{
    res.send('<h1>welcome! to my app</h1>')
   
})

//port

const PORT=process.env.PORT||8080

//listen app

app.listen(PORT,()=>{
    console.log('server running');
})