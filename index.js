const express = require("express")
const app = express()
const cors = require("cors")
const router = require("./router")
const mongoose = require("mongoose")

const dbURI = "mongodb+srv://remus432:supersecretpass@cluster0.ugtkl.mongodb.net/qr-generator?retryWrites=true&w=majority"

mongoose.connect(dbURI, () => {
  console.log("connected to mongodb")
})

const PORT = process.env.PORT || 3001

app.use(cors({ origin: "https://qr-code-generator-chi.vercel.app" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)

app.listen(PORT)