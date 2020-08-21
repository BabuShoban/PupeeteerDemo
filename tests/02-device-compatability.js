const puppeteer = require("puppeteer");

describe("Device Compatablity", async () => {
  it("Test against custom screen resolution", async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 500 });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });
    await page.goto("https://www.thoughtworks.com");
    await browser.close();
  });

  it("Device emulation - iPhone", async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 500 });
    await page.emulate(puppeteer.devices["iPhone X"]);
    await page.goto("https://www.thoughtworks.com");
    await browser.close();
  });

  it("Device emulation on Landscape", async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 500 });
    await page.emulate(puppeteer.devices["iPhone X landscape"]);
    await page.goto("https://www.thoughtworks.com");
    await browser.close();
  });
});
