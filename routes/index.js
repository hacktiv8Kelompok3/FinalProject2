const router = require("express").Router();
const userRouters = require("./user.js");
const photoRouters = require("./photo.js")
const socialMediaRouters = require("./socialmedia")

router.use('/users',userRouters);
router.use("/photo", photoRouters)
router.use("/socialmedia", socialMediaRouters)


module.exports = router;