const puppeteer = require("puppeteer");

describe("Test for Page Tracinng", async () => {
  it("Page Tracing for Thoughtworks site", async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 500 });
    const page = await browser.newPage();

    await page.tracing.start({ path: "trace.json" });
    await page.goto("https://thoughtworks.com", {
      waitUntil: "networkidle0",
    });
    await page.tracing.stop();

    await browser.close();
  });
});
