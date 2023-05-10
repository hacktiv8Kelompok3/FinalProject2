const router = require("express").Router();
const userRouters = require("./user.js");
const photoRouters = require("./photo.js")

router.use("/photo", photoRouters)
router.use('/users',userRouters);


module.exports = router;