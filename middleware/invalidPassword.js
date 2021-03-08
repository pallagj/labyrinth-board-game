module.exports = function invalidPassword(req, res){
    let password = req.body.password

    if(typeof password === 'undefined')
        return true

    if(password.length < 6){
        console.log('auth - register: SHORT PASSWORD')

        res.locals.error = 'Password is too short, please give more then 6 characters!'
        return true
    }

    if(password.match(/[0-9]/) == null){
        console.log('auth - register: NO NUMBER IN PASSWORD')

        res.locals.error = 'Password should contains minimum 1 number!'
        return true
    }

    if(password.match(/[A-Z]/) == null){
        console.log('auth - register: NO UPCASE IN PASSWORD')

        res.locals.error = 'Password should contains minimum 1 upper case character!'
        return true
    }
}
