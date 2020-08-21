const puppeteer = require("puppeteer");

describe("Mocking/Stubbing", async () => {
  it("Intercept tw image test", async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 200 });
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    // https://www.google.co.in/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png
    const base64Image =
      "/Users/shobanbabumanohar/Documents/Shoban/Learnings/PPTR_demo/Chrome-Logo.png";
    const imageBuffer = Buffer.from(base64Image, "base64");
    console.log(buffer);
    page.on("request", (intercept) => {
      if (intercept.url() === "https://www.thoughtworks.com/imgs/tw-logo.svg") {
        intercept.respond({
          status: 200,
          contentType: "image/png",
          body: imageBuffer,
        });
      } else intercept.continue();
    });

    await page.goto("https://www.thoughtworks.com", {
      waitUntil: "networkidle0",
    });

    // await browser.close();
  });
});
