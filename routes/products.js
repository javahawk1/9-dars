const express = require("express")
const router = express.Router()
const { Product, productsValidation } = require("../models/products")

router.get("/", async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query
        page = Number(page)
        limit = Number(limit)
        const skip = (page - 1) * limit
        let data = await Product.find().populate("category").limit(limit).skip(skip)
        res.send(data)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get("/category/:id", async (req, res) => {
    try {
        let data = await Product.find({ category: req.params.id })
        res.send(data)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post("/", async (req, res) => {
    try {
        let { value, error } = productsValidation.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        let data = await Product.create(value)
        res.status(201).send(data)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.patch("/:id", async (req, res) => {
    try {
        let { value, error } = productsValidation.validate(req.body)

        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        let data = await Product.findByIdAndUpdate(req.params.id, value, { new: true })
        res.send(data)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.send("Deleted")
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router