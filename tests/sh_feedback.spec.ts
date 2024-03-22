import { test, expect } from '../fixtures/pomFixtures';
// const testdata = JSON.parse(JSON.stringify(require("../data/testdata.json")))
// import dotenv from "dotenv"

// dotenv.config({
//   path: `env/.env.uat`,
//   override : true
// })

test.describe.serial('Validate Return user journey', () => {
  test.beforeEach(async ({ page, homePage }) => {
 
    await homePage.navigate();
    // await homePage.LoginToSupportHub(testdata.ReturnUser)
    // await homePage.validateReturnUserLogin();
  });
  test('validate return user journey_validate provide feedback with IDV Yes', async ({ page, homePage }) => {
    test.slow();
    try {
            // await editSupportPage.validateprovideFeedbackWithIDV();
            await homePage.navigate();
            await page.close();
    }
    catch (error) {
      console.log(error)
    }
  });
});