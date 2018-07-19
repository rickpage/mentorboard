var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:1234/messageboard')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


  var bcrypt = require('bcrypt');
  var UserSchema = mongoose.Schema({
      local: {
          username: String,
          password: String
      },
      facebook: {
          id: String,
          token: String,
          email: String,
          name: String
      }
  });
  
  UserSchema.methods.generateHash = function(password){
      return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
  }
  
  UserSchema.methods.validPassword = function(password){
      return bcrypt.compareSync(password, this.local.password);
  }
  

module.exports = mongoose.model('User', UserSchema);