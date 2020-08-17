const puppeteer = require("puppeteer");

describe("Test for falkiness", async () => {
  it("Falkiness test", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.thoughtworks.com", {
      waitUntil: "networkidle0",
    });

    const snapshot = await page.accessibility.snapshot();
    console.log(snapshot);
    await browser.close();
  });
});
