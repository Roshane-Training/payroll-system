const express = require('express')
const router = express.Router()
const DB = require('../../lib/db')
const bcrypt = require('bcrypt')

/**
 * Admin Login Endpoint
 */
router.post('/login', (req, res) => {
    const [email, password] = [req.body.email, req.body.password]
    const loginInfoQuery = 'SELECT * FROM users WHERE email = ?;'

    DB.query(loginInfoQuery, [email], (err, rows) => {
        if (err) throw err

        if (rows.length > 0 && bcrypt.compareSync(password, rows[0].password)) {
            if (req.query.next && req.query.next != '') {
                res.redirect(req.query.next)
            } else {
                res.redirect('/')
            }
        }
    })
})

/**
 * Admin Logout Endpoint
 */
router.get('/logout', (req, res) => {
    req.session.destroy(console.log)

    if (req.query.next && req.query.next != '') {
        res.redirect(req.query.next)
    } else {
        res.redirect('/')
    }
})

module.exports = router
