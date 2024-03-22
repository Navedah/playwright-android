import { defineConfig, devices } from '@playwright/test';
// import dotenv from "dotenv";


// dotenv.config({
//   path: `.env.uat`,
//   override : true
// })
export default defineConfig({

  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : 4,
  timeout: 60* 60* 1000,
 
  reporter: [['html']],
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 29000,
    toHaveScreenshot: {
      // An acceptable amount of pixels that could be different, unset by default.
      maxDiffPixels: 10,
    }},

  use: {
    httpCredentials: {
      username: 'c85418b',
      password: 'Von@2023',
    },
    viewport: { width: 1920, height: 1080 },    
    video: 'retain-on-failure',
      trace: 'on-first-retry',
  },

  projects: [  
    //   {
    //   name: 'chrome',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //        screenshot:'only-on-failure'
    //   }
    //  },
    //       {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop firefox'],       
    //       screenshot:'only-on-failure'
    //   }, },
      // {
      //   name: 'edge',
      //   use: {
      //     ...devices['Desktop Edge'],       
      //       screenshot:'only-on-failure'
      //   }, },
        
      {
        name: 'Pixel 5:12:android@lambdatest',
        use: {}
      },
      {
        // Regex device name
        name: 'Galaxy*:12:android@lambdatest',
        use: {}
      },
         
            ]
});