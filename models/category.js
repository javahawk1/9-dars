const mongoose = require("mongoose")
const joi = require("joi")

const categorySchema = new mongoose.Schema({
    name: String,
    image: String
})

const Category = mongoose.model("Category", categorySchema)

const categoryValidator = joi.object({
    name: joi.string().required(),
    image: joi.string().required()
})

module.exports = {Category, categoryValidator}
