const express = require('express')
const router = express.Router()
const DB = require('../../lib/db')

/**
 * Admin Employee View
 */
router.get('/', (req, res) => {
    const getAllEmployees = 'SELECT * FROM employees LIMIT 10000;'

    DB.query(getAllEmployees, (err, rows) => {
        if (err) throw err

        res.render('employee/index', { title: 'Employees', layout: 'layouts/admin', employees: rows })
    })
})

/**
 * Admin Employee Create
 */
router.get('/create', (req, res) => {
    res.render('employee/create', { title: 'Employee Create', layout: 'layouts/admin' })
})

/**
 * Admin Employee Edit
 */
router.get('/edit/:id', (req, res) => {
    const employeeId = req.params.id.trim()
    const getEmployeeQuery = 'SELECT * FROM employees WHERE id = ?;'

    DB.query(getEmployeeQuery, employeeId, (err, rows) => {
        if (err) throw err

        res.render('employee/edit', { title: 'Employee Edit', layout: 'layouts/admin', employee: rows[0] })
    })
})

module.exports = router
