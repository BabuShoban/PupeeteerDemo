const puppeteer = require("puppeteer");
const lighthouse = require("lighthouse");
const { expect } = require("chai");

describe("Lighthouse tests", () => {
  it("seo score should be 0.84", async () => {
    const browser = await puppeteer.launch({
      headless: false,
      args: [`--remote-debugging-port=${8042}`],
    });
    const lighthouseResult = await lighthouse("https://thoughtworks.com", {
      port: 8042,
      disableStorageReset: true,
    });

    expect(lighthouseResult.lhr.categories["seo"].score).equals(0.84);

    const time_to_interactive =
      lighthouseResult.lhr.audits["interactive"].displayValue;

    console.log(`Time To Interactive: ${time_to_interactive}`);
    console.log("Lighthouse audit", lighthouseResult);

    await browser.close();
  });
});
