const express = require('express');
const port = 3000;
const app = express();
const mongoose = require('mongoose');
const user = require('./model/user.model')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')


require('dotenv').config();


// config express 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');

app.set('view engine', 'pug');
app.set('views', './views');


// config mongoose
const optionMongoose = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.URI_MONGOOSE, optionMongoose)

// routing 
app.get('/', (req, res) => {
    res.render('index');
})
app.use('/user', userRoute)
app.use('/auth', authRoute)

//start server
app.listen(port, () => {
    console.log(`app listening at port: ${port}`);
});
