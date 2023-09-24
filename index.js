const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { appNotFound } = require('./middleware/appNotFound')

// mongoose connection
mongoose.connect('mongodb://localhost:27017/ecom', {
    family: 4
})
.then(console.log('db connected'))

app.use(express.json())

// required routes here
const userRoute = require('./routes/userRoute');


// routes 
app.use('/', userRoute);

// middleware
app.use(appNotFound)


app.listen(3000, console.log('port 3000'));