import app from './index.js';
import { connectDB } from './config/connection.js';
app.listen(8001,()=>{
    console.log('server is listening at port 8001');
    connectDB();
})