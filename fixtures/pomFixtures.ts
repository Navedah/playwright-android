import {test as baseTest} from "@playwright/test";
import HomePage from '../pages/home.page';
import { _android } from "playwright";
import { chromium } from "playwright";
import path from 'path';

type pages = {
        homePage:HomePage
        // dashboardPage:DashBoardPage,
        // editSupportPage:EditSupportPage
}


const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright JS Build - 2',
      'name': 'Playwright Test',
      'user': "naveda",    // add user name
      'accessKey': "Yh1YLaFEg4tcTrZ8KJHGUOLISGJHWRf2GNIFyoLTzKUKl7WZYJ",   // add access key
      'network': true,
      'video': true,
      'console': true,
      'tunnel': false, // Add tunnel configuration if testing locally hosted webpage
      'tunnelName': '', // Optional
      'geoLocation': '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
    }
  }

// Patching the capabilities dynamically according to the project name.
const modifyCapabilities = (configName, testName) => {
    let config = configName.split('@lambdatest')[0]
  
    // Check if its an android test or a desktop test
    if (configName.match(/android/)) {
      let [deviceName, platformVersion, platform] = config.split(':')
      capabilities['LT:Options']['deviceName'] = deviceName
      capabilities['LT:Options']['platformVersion'] = platformVersion
      capabilities['LT:Options']['platformName'] = platform
      capabilities['LT:Options']['name'] = testName
      capabilities['LT:Options']['build'] = 'Playwright JS Android Build'
      capabilities['LT:Options']['isRealMobile'] = false


// Delete the browserName and browserVersion properties
capabilities.browserName = "";
capabilities.browserVersion = "";

// capabilities.browserName?.delete();
  
    } else {
      // Desktop test
      let [browserName, browserVersion, platform] = config.split(':')
      capabilities.browserName = browserName ? browserName : capabilities.browserName
      capabilities.browserVersion = browserVersion ? browserVersion : capabilities.browserVersion
      capabilities['LT:Options']['platform'] = platform ? platform : capabilities['LT:Options']['platform']
      capabilities['LT:Options']['name'] = testName
    }
  }

const testPages = baseTest.extend<pages>({

    homePage:async({page}, use, testInfo) =>{    

        let fileName = testInfo.file.split(path.sep).pop();
        if (testInfo.project.name.match(/lambdatest/)) {

            // modifyCapabilities(
            //     testInfo.project.name,
            //     `${testInfo.title} - ${fileName}`
            //   );

            modifyCapabilities(testInfo.project.name, `${testInfo.title} - ${fileName}`)
            let device, context, browser, ltPage;

            // const browser = await chromium.connect({
            //     wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            //     JSON.stringify(capabilities)
            //     )}`,
            // });
        
            // const ltPage = await browser.newPage(testInfo.project.use);
            if (testInfo.project.name.match(/android/)) {
                // Android test
                device = await _android.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`);
                await device.shell("am force-stop com.android.chrome");
            
                context = await device.launchBrowser();
                ltPage = await context.newPage(testInfo.project.use);
              } else {
                // Desktop test
                browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`)
                ltPage = await browser.newPage(testInfo.project.use)
              }
            
            await use(new HomePage(ltPage));

            const testStatus = {
                action: "setTestStatus",
                arguments: {
                status: testInfo.status,
                remark: testInfo.error?.stack || testInfo.error?.message,
                },
            };
            await ltPage.evaluate(() => {},
            `lambdatest_action: ${JSON.stringify(testStatus)}`);

            await ltPage.close();
            await context?.close();
            await browser?.close()
            await device?.close();

        } else {
            // Run tests in local in case of local config provided
            await use(new HomePage(page));
          }
    },
    // dashboardPage:async({page}, use) =>{
    //     await use(new DashBoardPage(page));
    // },

    // editSupportPage:async({page}, use) =>{
    //     await use(new EditSupportPage(page));
    // }
})

export const test = testPages;
export const expect = testPages.expect;