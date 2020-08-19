const puppeteer = require("puppeteer");

describe("Network Emulation", () => {
  it("Network Emulation for slow 3G", async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();

    const slow3G = {
      // Network connectivity is absent
      offline: false,
      // Download speed (bytes/s)
      downloadThroughput: ((500 * 1024) / 8) * 0.8,
      // Upload speed (bytes/s)
      uploadThroughput: ((500 * 1024) / 8) * 0.8,
      // Latency (ms)
      latency: 400 * 5,
    };

    await client.send("Network.enable");
    await client.send("Network.emulateNetworkConditions", slow3G);

    await page.goto("https://www.thoughtworks.com");

    await browser.close();
  });
});
