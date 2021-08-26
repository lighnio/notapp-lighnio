const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://defaultuser:default@cluster0.gmiuk.mongodb.net/notapp?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));