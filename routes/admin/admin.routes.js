const express = require('express')
const router = express.Router()
const DB = require('../../lib/db')

/**
 * Admin Login
 */
router.get('/login', (req, res) => {
    res.render('admin/login', { title: 'Admin Sign In', layout: false })
})

/**
 * Admin Index
 */
router.get('/', (req, res) => {
    res.render('admin/index', { title: 'Admin Dashboard', layout: 'layouts/admin' })
})

module.exports = router
