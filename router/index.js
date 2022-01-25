const router = require("express").Router()
const PageInfo = require("../model")
const getPageInfo = require("../utils")

router.get("/", async (req, res) => {
  res.send("Welcome to API")
})

router.get("/data", async (req, res) => {
  const pageInfos = await PageInfo.find()

  res.status(200).send(pageInfos)
})

router.post("/data", async (req, res) => {
  const { url } = await req.body

  await PageInfo.collection.deleteMany({})
  const pageInfoObj = await new PageInfo(await getPageInfo(url))
  const result = await pageInfoObj.save()

  console.log(result)
  res.send("works")
})

module.exports = router