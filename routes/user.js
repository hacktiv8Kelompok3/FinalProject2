const router = require('express').Router()
const user = require('../controllers/userController')
const authentication = require("../middleware/authentication")
const authorizationUser = require('../middleware/authorizationUser')

router.post('/register', user.register)
router.post('/login', user.login)
router.use(authentication)
router.get('/', user.getAllUsers)
router.put('/:id',authorizationUser, user.updateUser)
router.delete('/:id', user.deleteUser)


module.exports = router;