const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://singhrishu680@gmail.com:@%g9#ePmZp42dm!@cluster0.taxsifz.mongodb.net/student');
mongoose.connect('mongodb://127.0.0.1/authentication')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error conneting to MongoDB'))

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
})

module.exports = db;