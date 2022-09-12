var express = require('express');
const sha2 = require('sha2').SHA256;
var router = express.Router();
var User = require('../utils/db-users.js');
var tTransporter = require('../utils/mailerTransporter').tTransporter;

router.get('/', function(req, res){
    res.render('register');
});

router.post('/reg', function(req, res) {
    let mailOptions = {
        from: '"Tomasz Pudło" <tom.pud.96@gmail.com>', // adres nadawcy
        to: req.body.email, // lista odbiorców
    };
    // tworzenie użytkownika i wysyłanie maila...
    var newUser = new User({"username":req.body.username, "password":sha2(req.body.password).toString("hex"),
                    "email": req.body.email, "active": false});
    newUser.save(function(err,data) {
        if (err) return console.error(err);
        var host = "https://tomaszp.herokuapp.com";
        var aL = host + '/activate/' + data._id;
        
        res.render('mailBody', {activationLink: aL}, function(err, body){
            mailOptions.html = body;
            mailOptions.subject = 'Aktywacja konta';
            console.log(body);
            tTransporter.sendMail(mailOptions, (error, info) => {
                if (error) { return console.log(error); }
                res.send(`
                <h3>Utworzony użytkownik:</h3> ${data}<br>
                Wiadomość o ID ${info.messageId} wysłana: ${info.response}.
                `);
            });
        });
    });
});

module.exports = router;