const { User } = require('../models')
class usercontroller {

    static async register(req, res) {
        try {
            const {
                email,
                full_name,
                username,
                password,
                profile_image_url,
                age,
                phone_number
            } = req.body

            const data = await User.create({
                email,
                full_name,
                username,
                password,
                profile_image_url,
                age,
                phone_number
            })

            const response = {
                id: data.id,
                full_name: data.full_name,
                username: data.username,
                profile_image_url: data.profile_image_url,
                age: data.age,
                phone_number: data.phone_number
            }
            res.status(200).send(response)
        } catch (error) {
            res.status(error?.code || 500).json(error)
            // console.log(error)
        }
    }

    static async login(req, res) {
        try {
            const {
                email,
                password
            } = req.body
            const user = await User.findOne({
                where: {
                    email:email
                }
            })
            if (!user) {
                throw {
                    code: 404,
                    message: 'User not found'
                }
            }
            const response = {
                id: user.id,
                email: user.email,
                username: user.username
            }
            res.status(200).json(response)
        } catch (error) {
            res.status(error?.code || 500).json(error)
        }
    }
    
}

module.exports = usercontroller