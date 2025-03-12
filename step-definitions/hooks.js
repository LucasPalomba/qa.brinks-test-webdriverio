import { AfterStep, After } from '@wdio/cucumber-framework';
import ScreenshotHelper from '../helpers/evidenceHelper.js';
import AzureHelper from '../helpers/azureHelper.js';

AfterStep(async function (scenario) {
    if (scenario.result.status === 'FAILED') {
        const screenshotPath = await ScreenshotHelper.takeScreenshot(scenario.pickle.name);
        await AzureHelper.uploadEvidence(scenario.pickle.name, screenshotPath);
    }
});

After(async function () {
    console.log('Finalizando teste...');
});