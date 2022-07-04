/**
 *
 * @param {Request} req The interface that represents express request
 * @param {Response} res The interface that represents express response for a request
 * @param {import("express").NextFunction} next This function that runs after the checks are passed
 */
function isAdmin(req, res, next) {
    if (req.session.isAdmin === true) {
        next()
    } else {
        res.redirect('/')
    }
}

module.exports = { isAdmin }
