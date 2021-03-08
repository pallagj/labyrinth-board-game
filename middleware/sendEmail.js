var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'labyrinthboardgame@gmail.com',
        pass: 'labyrinthboardgame123'
    }
})

function sendEmail(user) {
    let target = user.email
    let password = user.password

    let mailOptions = {
        from: 'labyrinthboardgame@gmail.com',
        to: target,
        subject: 'Labyrinth forgotten password',
        text:
            'Dear ' + user.name + '! 😍\n' +
            '\n' +
            'You forgot your password unfortunately 😒.\n' +
            'You can log in with the following new temporary password 😎. \n' +
            '\n' +
            'Please change your password immediately after logging in. 🥺 \n' +
            '\n' +
            'Password: ' + password + '\n' +
            '\n' +
            'Thanks man 😘',
        html:
            `
            <p><b>Dear ${user.givenName}!</b></p>
            <p>
            You forgot your password unfortunately <br>
            You can log in with the following new temporary password.
            </p>

            <p>Password: <b>${password}</b></p> 
            <p>Please change your password immediately after logging in. </p>  
            
            <img class="mb-4" src="https://lh3.googleusercontent.com/a-/AOh14GgHjxON3TvMNBVLPSpZOZz8B-w6iu4nKLDOL-RR=s40" alt="" width="72" height="72">
            <p>
                <b>Thanks, </b><br>
                LabyritnhBoardGame team
            </p>
            `
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}


module.exports = sendEmail
