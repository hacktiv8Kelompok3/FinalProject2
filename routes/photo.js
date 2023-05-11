const router = require("express").Router()
const photo = require("../controllers/photocontroller")
const authentication = require("../middleware/authentication")

router.use(authentication)

router.get("/", photo.getAllPhoto)
router.post("/create", photo.createPhoto)
router.delete("/:id", photo.deletePhoto)
router.put("/:id", photo.updatePhoto)

module.exports = router