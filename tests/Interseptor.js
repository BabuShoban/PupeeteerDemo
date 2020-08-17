const puppeteer = require("puppeteer");

describe("Test for Network interseptor", async () => {
  it("Intercept google image test", async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 200 });
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    const base64 =
      "/Users/shobanbabumanohar/Documents/Shoban/Learnings/PPTR_demo/Chrome-Logo.png";
    const buffer = Buffer.from(base64, "base64");
    console.log(buffer);
    page.on("request", (intercept) => {
      if (intercept.url() === "https://www.thoughtworks.com/imgs/tw-logo.svg") {
        intercept.respond({
          status: 200,
          contentType: "image/png",
          body: buffer,
          //"https://i.picsum.photos/id/203/536/354.jpg?hmac=W9l4oOM9AMcf1ZNXCUefHmc2bmFB8K_hEutRTULrITQ",
        });
      } else intercept.continue();
    });

    await page.goto("https://www.thoughtworks.com", {
      waitUntil: "networkidle0",
    });

    //await browser.close();
  });
});

// https://www.google.co.in/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png
