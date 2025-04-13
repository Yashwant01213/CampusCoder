import * as Http from 'http';
import app from './app.mjs'

const port = process.env.PORT||3000;


const server = Http.createServer(app);

server.listen(port,()=>{
    console.log(`the server is running at port ${port}`);
})