
const express = require('express');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
const apiroutes = require('./api/routes/user.routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', apiroutes); //using routes specified externally
app.use('/user', apiroutes); //using routes specified externally

// mongoose.connect(`mongodb://localhost:27017/mongo_db`)
// .then(() => {
//     app.listen(3000);                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
//     console.log("Server started")
// })

mongoose.connect("mongodb://localhost:27017/mongoPro", {
   useNewUrlParser: true 
}).then(() => {
    app.listen(3002);
    console.log('server started');
}).catch(err => {
    console.log(err);
});

