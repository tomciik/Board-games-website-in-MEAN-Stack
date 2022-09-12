var mongoose = require('mongoose');
const sha2 = require('sha2').SHA256

mongoose.connect(
  'mongodb+srv://student:stud234@boardgames.ucgwl.mongodb.net/boardgames?retryWrites=true&w=majority',
  function(err) {
    if(err) {
        console.log('błąd połączenia', err);
    } else {
        console.log('połączenie udane');
    }
});

var userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  email: { type: String, required: true, unique: true},
  active: {type: Boolean, required: true, default: false},
  admin: {type: Boolean, default: false}
});

userSchema.methods.validPassword = function(pass) {
 return sha2(pass).toString("hex")==this.password;
};

userSchema.methods.accountActivate = function()
{
  return this.active;
}

module.exports = mongoose.model('users', userSchema, 'users');