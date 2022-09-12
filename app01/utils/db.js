var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BoardSchema = new Schema({
    nazwa: String,
    kategoria: String,
    cena: String,
    ocena: String
});

mongoose.connect('mongodb+srv://student:stud234@boardgames.ucgwl.mongodb.net/boardgames?retryWrites=true&w=majority',
function(err) {
    if(err) {
        console.log('błąd połączenia', err);
    } else {
        console.log('połączenie udane');
    }
});

module.exports = mongoose.model('boardgames', BoardSchema,'g');