const express = require("express")
const mongoose = require("mongoose")
const Category = require("./routes/category")
const Products = require("./routes/products")

const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://djakhadeveloper:5z6OR2y9kdHWZRSW@cluster0.rh6rnzg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connected to db"))
    .catch((err) => console.log(err))

app.use("/category", Category)
app.use("/products", Products)

app.listen(3000, () => {
    console.log("server started")
})