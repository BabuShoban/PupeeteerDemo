const puppeteer = require("puppeteer");

describe("Page Tracing", async () => {
  it("Page Tracing for Thoughtworks site", async () => {
    const browser = await puppeteer.launch({ headless: true, slowMo: 500 });
    const page = await browser.newPage();

    await page.tracing.start({ path: "trace.json" });
    await page.goto("https://thoughtworks.com", {
      waitUntil: "networkidle0",
    });
    await page.tracing.stop();

    await browser.close();
  });
});
