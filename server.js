import app from './index.js';
import { connectDB } from './config/connection.js';
const hostname="0.0.0.0";
app.listen(8001,hostname,()=>{
    console.log('server is listening at port 8001');
    connectDB();
})
