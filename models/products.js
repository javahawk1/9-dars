const mongoose = require("mongoose")
const joi = require("joi")

const productsSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    count: Number
})

const Product = mongoose.model("Product", productsSchema)

const productsValidation = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    price: joi.number().max(100000000000).min(0),
    category: joi.string(),
    count: joi.number().min(0).required()
})

module.exports = { Product, productsValidation }