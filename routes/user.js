const router = require('express').Router()
const user = require('../controllers/usercontroller')

router.post('/register', user.register)
router.post('/login', user.login)


module.exports = router;