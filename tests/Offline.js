const puppeteer = require("puppeteer");

describe("Test for Offline mode", async () => {
  it("Offline Mode", async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 500 });
    const page = await browser.newPage();

    await page.goto("https://github.hubspot.com/offline/docs/welcome/", {
      waitUntil: "networkidle0",
    });

    await page.setOfflineMode(true);

    //await browser.close()
  });
});
