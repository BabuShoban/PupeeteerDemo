const puppeteer = require("puppeteer");

describe("Geolocation", async () => {
  it.only("Set geolocation as chicakago", async () => {
    const browser = await puppeteer.launch({ headless: false });

    const context = await browser.defaultBrowserContext();
    await context.overridePermissions(
      "https://locations.dennys.com/search.html",
      ["geolocation"]
    );

    const page = await context.newPage();

    await page.setGeolocation({
      latitude: 41.8339037,
      longitude: -87.8720466,
    });

    await page.goto("https://locations.dennys.com/search.html");
    await page.click(".Locator-buttons button");

    // await browser.close();
  });
});
