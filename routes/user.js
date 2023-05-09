const router = require('express').Router()
const user = require('../controllers/userController')

router.get('/', user.getAllUsers)
router.put('/:id', user.updateUser)
router.post('/register', user.register)
router.post('/login', user.login)
router.delete('/:id', user.deleteUser)


module.exports = router;