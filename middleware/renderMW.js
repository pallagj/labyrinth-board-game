/**
 * Using the template engine render the values into the template
 */


module.exports = function(objectrepository, viewName) {
    return function(req, res) {
        res.locals.query = req.query
        res.locals.url   = req.originalUrl
ó
        res.render(viewName)
    }
}
