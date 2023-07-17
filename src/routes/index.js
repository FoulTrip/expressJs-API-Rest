const { Router } = require('express')
const router = Router()
const authorsInfo = require('../model/DataAutores');

router.get('/', (req, res) => {
    res.json(authorsInfo)
})

module.exports = router;