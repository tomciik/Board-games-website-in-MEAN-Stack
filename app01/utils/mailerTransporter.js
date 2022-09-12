const nodemailer = require('nodemailer');


var tTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tom.pud.96@gmail.com', 
        pass: 'student234'
    },
});

module.exports = 
{   
    tTransporter: tTransporter
}