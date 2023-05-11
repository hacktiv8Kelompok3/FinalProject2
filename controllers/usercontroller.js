const { User } = require('../models')
const { comparePassword,hashPassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")
class userController {
    static async getAllUsers(req, res) {
        try {
            const data = await User.findAll({})
            console.log(data)
            res.status(200).json(data)
        } catch (error) {
            res.status(error?.code || 500).json(error)
        }
    }
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
            console.log(error)
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
            const isCorrect = comparePassword(password, user.password)
            console.log(password)
            console.log(user.password)
            console.log(isCorrect)
            if (!isCorrect) {
                throw {
                  code: 401,
                  message: "Incorrect password"
                }
            }
            const response = {
                id: user.id,
                email: user.email,
                username: user.username
            }
            const token = generateToken(response)
            console.log(token, '<< token')
            res.status(200).json(response)
        } catch (error) {
            res.status(error?.code || 500).json(error)
            console.log(error)
        }
    }
    static async updateUser(req, res) { 
        try {
            const { id } = req.params
            const {
                email,
                full_name,
                username,
                password,
                profile_image_url,
                age,
                phone_number
            } = req.body

            const result = await User.update({
                email,
                full_name,
                username,
                password,
                profile_image_url,
                age,
                phone_number
            }, {
                where: {
                    id
                },
                retruning:true
            })
            res.status(201).json(result)
        } catch (error) {
            res.status(error?.code || 500).json(error)
        }
    }

    static async deleteUser(req, res) { 
        try {
            const { id } = req.params
            const result = await User.destroy({
                where: { id }
            })
            if (!result) {
                throw {
                  code: 404,
                  message: "Data not found!"
                }
            }
            res.status(201).json(result)
        } catch (error) {
            res.status(error?.code || 500).json(error)
            console.log(error)
        }
    }
}

module.exports = userController