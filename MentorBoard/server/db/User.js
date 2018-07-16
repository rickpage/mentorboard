var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:1234/messageboard')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        default:'',
    },
    password: {
        type: String,
        default:'',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
});
UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema);