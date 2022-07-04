const express = require('express')
const router = express.Router()
const DB = require('../../lib/db')

/**
 * Payroll Add Endpoint
 */
router.post('/add', (req, res) => {
    const payrollData = {
        employee_id: req.body.employee,
        department_id: req.body.department,
        hours_worked: req.body.hours_worked,
        overtime_hours: req.body.overtime_hours_worked,
        date: new Date().toISOString().slice(0, 19).replace('T', ' ').split(' ')[0],
    }
    const payrollInsertQuery = 'INSERT INTO salaries SET ?;'

    DB.query(payrollInsertQuery, payrollData, (err, results) => {
        if (err) throw err

        // Check if the insert was successful
        if (results.affectedRows >= 1) {
            // Go to the next page or go back to the index page
            res.redirect(req.query.next ?? '/admin/payroll/')
        } else {
            console.log(results)
        }
    })
})

/**
 * Payroll Update Endpoint
 */
router.post('/update/:id', (req, res) => {
    const payrollId = req.params.id
    const payrollUpdateData = { first_nm: req.body.first_nm, last_nm: req.body.last_nm, email: req.body.email }
    const payrollUpdateQuery = 'UPDATE payroll SET ? WHERE id = ?;'

    DB.query(payrollUpdateQuery, [payrollUpdateData, payrollId], (err, results) => {
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
