const fs = require("fs")
const puppeteer = require("puppeteer")

const base64_encode = file => {
  // Read binary data
  const bitmap = fs.readFileSync(file)
  return new Buffer.from(bitmap).toString("base64")
}

const getPageInfo = async (url) => {
  try {
    
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    })
    const page = await browser.newPage()

    await page.goto(`${url}`, { timeout: 0, waitUntil: "load" })

    const pageTitle = await page.title()

    let pageDescription
    let pageHeadline
    
    try {
      pageDescription = await page.$eval("head > meta[name='description']", element => element.content)
    } catch (e) {
      pageDescription = null
      pageHeadline = await page.evaluate(() => document.querySelector("h1").innerText)
    }
   
    await page.screenshot({ path: "screenshot.png" })

    const pageScreenshot = await base64_encode("screenshot.png")

    await browser.close()

    return {
      title: pageTitle,
      description: pageDescription,
      headline: pageHeadline,
      screenshot: pageScreenshot
    }
  } catch (err) {
    throw err
  }
}

module.exports = getPageInfo