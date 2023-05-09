const router = require("express").Router();
const userRouters = require("./user.js");


router.use('/users',userRouters);


module.exports = router;