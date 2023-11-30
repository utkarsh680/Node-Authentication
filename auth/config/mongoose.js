const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1/authentication')

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.taxsifz.mongodb.net/?retryWrites=true&w=majority`);
// hello
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error conneting to MongoDB'))

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
})

module.exports = db;