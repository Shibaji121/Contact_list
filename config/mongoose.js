//require library
const mongoose = require('mongoose');

//connection to database
mongoose.connect('mongodb://0.0.0.0/contacts_list_db');

//this will used as acessing database
const db = mongoose.connection; 

//If error occured
db.on('error', console.error.bind(console, 'Error connecting to db'));

//Check Successfully connection
db.once('open', function(){
    console.log('Successfully connected to the database');
})