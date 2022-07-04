const express = require('express')
const router = express.Router()
const DB = require('../../lib/db')
const { RenderError } = require('../../lib/helpers')
const bcrypt = require('bcrypt')

/**
 * Employee Add Endpoint
 */
router.post('/add', (req, res) => {
    const employeeData = { first_nm: req.body.first_nm, last_nm: req.body.last_nm, email: req.body.email, password: req.body.password }
    const employeeInsertQuery = 'INSERT INTO employees SET ?;'

    DB.query(employeeInsertQuery, employeeData, (err, results) => {
        if (err) throw err

        // Check if the insert was successful
        if (results.affectedRows >= 1) {
            // Go to the next page or go back to the index page
            res.redirect(req.query.next ?? '/')
        } else {
            console.log(results)
        }
    })
})

/**
 * Employee Update Endpoint
 */
router.post('/update/:id', (req, res) => {
    const employeeId = req.params.id
    const employeeUpdateData = { first_nm: req.body.first_nm, last_nm: req.body.last_nm, email: req.body.email }
    const employeeUpdateQuery = 'UPDATE employees SET ? WHERE id = ?;'

    DB.query(employeeUpdateQuery, [employeeUpdateData, employeeId], (err, results) => {
        if (err) throw err

        // Check if the update was successful
        if (results.affectedRows >= 1) {
            // Go to the next page or go back to the index page
            res.redirect(req.query.next ?? req.originalUrl)
        } else {
            console.log(results)
        }
    })
})

module.exports = router
