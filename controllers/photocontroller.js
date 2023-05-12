const { Photo, User } = require("../models")

class photoController {
    static async getAllPhoto(req, res) {
        try {
            const { id } = req.UserData
            console.log(id);
            
            const data = await Photo.findAll({
                where: {
                    UserId: id
                }, 
                include: [
                    {
                        model: User
                    }
                ]
            })

            res.status(200).json(data)
        } catch (error) {
            res.status(400).json(error)
            console.log(error);
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
        if(!data) {
            throw {
                code: 404,
                message: "tidak boleh kosong!!"
            }
        }

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

    static async deletePhoto(req, res) {
        try {
            const { id } = req.params
            console.log(id);

            const data = await Photo.destroy({
                where: {
                    id
                }
            })

            if(!data) {
                throw {
                    code: 404,
                    message: "data tidak ditemukan"
                }
            }

            res.status(200).json(data)
        } catch (error) {
            res.status(404).json(error)
            console.log(error);
        }
    }

    static async updatePhoto(req, res) {
        try {
            const { id } = req.params

            const { 
                title,
                caption,
                poster_image_text
            } = req.body

            const data = await Photo.update({
                title,
                caption,
                poster_image_text
            }, {
                where: {
                    id
                }, 
                returning: true
            })

            res.status(200).json(data)
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

module.exports = photoController