const express = require('express')
const router = express.Router()
const DB = require('../../lib/db')

/**
 * Admin Payroll View
 */
router.get('/', (req, res) => {
    const getAllPayrolls = `SELECT
                                sal.id, CONCAT(emp.first_nm, " ", emp.last_nm) AS full_name,
                                emp.email,
                                dp.dept_name,
                                sal.hours_worked AS working_hrs,
                                sal.overtime_hours AS overtime_hrs,
                                dp.hourly_rate,
                                (sal.hours_worked * dp.hourly_rate) AS basic_pay,
                                (sal.overtime_hours * (dp.hourly_rate * 1.5)) AS overtime_pay,
                                ((sal.hours_worked * dp.hourly_rate) + (sal.overtime_hours * (dp.hourly_rate * 1.5))) AS total_pay,
                                sal.date
                            FROM salaries sal
                            JOIN employees emp ON sal.employee_id = emp.id
                            JOIN departments dp ON sal.department_id = dp.id
                            LIMIT 10000;`

    DB.query(getAllPayrolls, (err, rows) => {
        if (err) throw err
        res.render('payroll/index', { title: 'Payroll', layout: 'layouts/admin', payrolls: rows })
    })
})

/**
 * Admin Payroll Create
 */
router.get('/create', (req, res) => {
    const getDepartmentsAndEmployeesQuery = `SELECT * FROM departments LIMIT 10000;
    SELECT id, CONCAT(first_nm, " ", last_nm) AS full_name FROM employees LIMIT 10000;`

    DB.query(getDepartmentsAndEmployeesQuery, (err, rows) => {
        if (err) throw err

        res.render('payroll/create', { title: 'Payroll Create', layout: 'layouts/admin', departments: rows[0], employees: rows[1] })
    })
})

/**
 * Admin Payroll Edit
 */
router.get('/edit/:id', (req, res) => {
    const payrollId = req.params.id
    const getPayrollQuery = 'SELECT * FROM salaries WHERE id = ?;'

    DB.query(getPayrollQuery, payrollId, (err, rows) => {
        if (err) throw err

        res.render('payroll/edit', { title: 'Payroll Edit', layout: 'layouts/admin', payroll: rows[0] })
    })
})

/**
 * Admin Payroll History
 */
router.get('/history', (req, res) => {
    res.render('payroll/history', { title: 'Payroll History', layout: 'layouts/admin' })
})
module.exports = router
