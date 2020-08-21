const puppeteer = require("puppeteer");
const { expect } = require("chai");

describe("Accessibility", async () => {
  it("Accessibility snapshot test", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.thoughtworks.com", {
      waitUntil: "networkidle0",
    });

    const snapshot = await page.accessibility.snapshot();
    console.log("Accessibility Tree ", snapshot);
    expect(snapshot.name).equals(
      "ThoughtWorks: A Global Software Consultancy | ThoughtWorks"
    );
    await browser.close();
  });

  it.only("verify default language is detected peoperly", async () => {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 200,
    });
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      "Accept-Language": "es",
    });
    await page.goto("https://www.google.com", {
      waitUntil: "networkidle0",
    });
    // await browser.close();
  });
});
