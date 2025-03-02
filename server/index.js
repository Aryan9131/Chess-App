const cors = require('cors');

const express=require('express');
const app=express();
const PORT=8000;


// Enable CORS for your frontend (React app) running on port 5417
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/',require('./routes'))

app.listen(PORT,(error)=>{
    if(error){
        console.log('Error while listening server !')
    }else{
        console.log('Server is listening at port : '+PORT);
    }
})