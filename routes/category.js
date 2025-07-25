const express = require("express")
const router = express.Router()

const { Category, categoryValidator } = require("../models/category")

router.get("/", async (req, res) => {
    try {
        let data = await Category.find()
        res.send(data)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post("/", async (req, res) => {
    try {
        let { value, error } = categoryValidator.validate(req.body)

        if (error) {
            return res.status(400).send(error.details[0].message)
        }


        let data = await Category.create(value)
        res.send(data)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.patch("/:id", async (req, res) => {
    try {
        let { value, error } = categoryValidator.validate(req.body)

        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        let data = await Category.findByIdAndUpdate(req.params.id, value)
        res.send(data)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        let data = await Category.findByIdAndDelete(req.params.id)
        res.send(data)
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router