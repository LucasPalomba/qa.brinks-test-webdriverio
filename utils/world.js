import { setWorldConstructor } from '@cucumber/cucumber'
import  ScreenshotHelper from '../utils/screenshotHelper.js'

class CustomWorld {
    constructor() {
        this.screenshotHelper = ScreenshotHelper;
        this.testKey = '';  // Será definido dinamicamente
        this.testName = ''; // Será definido dinamicamente
    }
}

setWorldConstructor(CustomWorld)