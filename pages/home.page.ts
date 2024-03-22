import { Page, Locator, expect } from '@playwright/test';
import { TIMEOUT } from 'dns';
import test from 'node:test';

// const testdata = JSON.parse(JSON.stringify(require("../data/testdata.json")))

class HomePage {
    page: Page;
    constructor(page: Page) {
        this.page = page;

        // this.getAcceptAllBtn = page.getByRole('button', { name: 'Accept all' })
    }






async navigate() {
    await this.page.goto("https://uat-supporthub.experian.co.uk");
    console.log("-->Support hub url is launched")
    await this.page.waitForTimeout(2000);
    // this.clickAcceptAllBtn();
}

}
export default HomePage;

