const router = require("express").Router()
const photo = require("../controllers/photocontroller")

router.get("/", photo.getAllPhoto)
router.post("/create", photo.createPhoto)

module.exports = router