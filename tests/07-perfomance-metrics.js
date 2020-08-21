const puppeteer = require("puppeteer");
const { expect } = require("chai");

describe("Performance metrics", async () => {
  it("site should take only 12MB of heap size", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.thoughtworks.com", {
      waitUntil: "networkidle0",
    });

    const metrics = await page.metrics();

    console.log(metrics);
    expect(metrics.JSHeapTotalSize).lessThan(12 * 1024 * 1024);

    await browser.close();
  });
});
