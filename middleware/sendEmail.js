let nodemailer = require('nodemailer')


const password = process.env['emailPassword']


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'labyrinthboardgame@gmail.com',
        pass: password
    }
})

/**
 * If the user forgot her/his password, than this function will send an email with a new generated password
 *
 * @param user
 */
function sendEmail(user) {
    let target = user.email
    let password = user.password

    let logoURL = 'https://lh3.googleusercontent.com/pw/ACtC-3ev_Ovf8QNeYYIBwbXu1xiXbBlIyPPuwB82YdEZhHsQtjBsNEXvjfNYouIZs9Bli71HsOkfnJRPe12Wqb6XxLXQEuK1isOLsVMUpdHVrwevV_HxLjXOfbG04yoH0IaWlK1FAIRFxTndp6izFAhTPaI=w82-h80-no?authuser=0'

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
            You forgot your password unfortunately. <br>
            You can log in with the following new temporary password.
            </p>

            <p>Password: <b>${password}</b></p> 
            <p>Please change your password immediately after logging in. </p>  
            
            <img class="mb-4" src="${logoURL}" alt="" width="72" height="72">
            <p>
                <b>Thanks, </b><br>
                LabyritnhBoardGame Team
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
