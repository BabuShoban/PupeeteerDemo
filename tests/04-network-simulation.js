const puppeteer = require("puppeteer");

describe("Network Simulation", () => {
  it("Network Emulation for slow 3G", async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
    const slow3G = {
      // Network connectivity is absent
      offline: false,
      // Download speed (bytes/s) 50 MB
      downloadThroughput: ((500 * 1024) / 8) * 0.8,
      // Upload speed (bytes/s) 50 MB
      uploadThroughput: ((500 * 1024) / 8) * 0.8,
      // Latency 2000 (ms)
      latency: 400 * 5,
    };
    await client.send("Network.enable");
    await client.send("Network.emulateNetworkConditions", slow3G);
    await page.goto("https://www.thoughtworks.com");
    await browser.close();
  });

  it("CPU load simlation - low end devices", async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
    await client.send("Network.enable");
    await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await page.goto("https://www.thoughtworks.com", {
      waitUntil: "networkidle0",
    });
    await browser.close();
  });

  it("Offline Mode", async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 500 });
    const page = await browser.newPage();

    await page.goto("https://github.hubspot.com/offline/docs/welcome/", {
      waitUntil: "networkidle0",
    });

    await page.setOfflineMode(true);

    await browser.close();
  });
});
