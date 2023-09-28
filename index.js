require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const { appNotFound } = require('./middleware/appNotFound')

// mongoose connection
mongoose.connect('mongodb://localhost:27017/ecom', {
    family: 4
})
.then(console.log('db connected'))

// mongoose connection
// mongoose.connect('mongodb+srv://grantapp:DewqgiiqCrv92sRT@cluster0.msgcuxv.mongodb.net/ecommercePortfolio?retryWrites=true&w=majority', {
//     family: 4
// })
// .then(() => {
//     console.log('db connected');
// })
// .catch((error) => {
//     console.error('Error connecting to the database:', error);
// });

app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.json())

// required routes here
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute')

// routes 
app.use('/', authRoute)
app.use('/', userRoute);
app.use('/product', productRoute)

// middleware
app.use(appNotFound)


app.listen(3000, console.log('port 3000'));