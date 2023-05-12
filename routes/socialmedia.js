const router = require("express").Router()
const socialMedia = require("../controllers/socialmediacontroller")
const authentication = require("../middleware/authentication")

router.use(authentication)

router.get("/", socialMedia.getAllSosmed)
router.post("/create", socialMedia.createSosmed)
router.put("/:id", socialMedia.updateSosmed)
router.delete("/:id", socialMedia.deleteSosmed)

module.exports = router