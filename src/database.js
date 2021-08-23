const mongoose = require('mongoose');

const dbName = 'notapp';

mongoose.connect('mongodb://localhost/'+dbName, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));