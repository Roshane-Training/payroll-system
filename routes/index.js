const express = require('express')
const router = express.Router()
const { SuccessResponse, ErrorResponse } = require('../lib/helpers')

router.get('/', (req, res) => {
    return res.render('index', { title: 'Home' })
})

module.exports = router
