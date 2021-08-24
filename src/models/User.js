const mongoose = require('mongoose');
const {Schema} = mongoose;

const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

UserSchema.methods.encryptPassword = async(pass) => {
    console.log('MSG FROM USER SCHEMA');
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(pass, salt);
    return hash;
}

UserSchema.methods.matchPassword = async function(pass) {
    console.log('MSG FROM USER SCHEMA');
    return await bcrypt.compare(pass, this.password)
}

module.exports = mongoose.model('User', UserSchema);