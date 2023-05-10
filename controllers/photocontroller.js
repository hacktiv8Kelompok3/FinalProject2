const { Photo } = require("../models")

class photoController {
    static async getAllPhoto(req, res) {
        try {
            const { id } = req.UserData

            const data = await Photo.findAll({
                where: {
                    UserId: id
                }
            })

            res.status(200).json(data)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async createPhoto(req, res) {
        try {
            const {
            title,
            caption,
            poster_image_text,
        } = req.body
        const { id } = req.UserData

        const data = await Photo.create({
            title,
            caption,
            poster_image_text,
            UserId: id
        })
        console.log(data);

        const response = {
            id: data.id,
            title: data.title,
            caption: data.caption,
            poster_image_text: data.poster_image_text,
            UserId: id
        }

        res.status(200).send(response)
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = photoController