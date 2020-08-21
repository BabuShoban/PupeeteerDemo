const puppeteer = require("puppeteer");

describe("Puppeteer", async () => {
  it("first test", async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 500 });
    const page = await browser.newPage();

    await page.goto("https://www.thoughtworks.com", {
      waitUntil: "networkidle0",
    });

    await browser.close();
  });
});
