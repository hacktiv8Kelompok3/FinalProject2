const router = require("express").Router();
const userRouters = require("./user.js");
const photoRouters = require("./photo.js")


router.use('/users',userRouters);
router.use("/photo", photoRouters)


module.exports = router;