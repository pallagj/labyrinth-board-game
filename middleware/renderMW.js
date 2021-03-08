/**
 * Using the template engine render the values into the template
 */


module.exports = function(objectrepository, viewName) {
    return function(req, res) {
        res.locals.query = req.query
        res.locals.url   = req.originalUrl
        res.locals.user  = req.session.user

        res.render(viewName)
    }
}
