const puppeteer = require("puppeteer")

let browser;
let page;

before(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 500 });
})

after(async () => {
    await browser.close()
})

describe("Test for Device", async () => {

    it("Setviewport", async () => {

        page = await browser.newPage();
        await page.setViewport({
            width: 528,
            height: 436
        })
        await page.goto("https://pptr.dev")
    })

    it("Device Emulation Iphone", async () => {

        await page.emulate(puppeteer.devices["iPhone 5"])
        await page.goto("https://pptr.dev")

    })

    it("Device emulation on Landscape", async () => {
        await page.emulate(puppeteer.devices["iPhone 5 landscape"])
        await page.goto("https://pptr.dev")
    })

})