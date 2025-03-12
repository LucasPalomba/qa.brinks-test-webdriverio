import { Before, AfterStep, After } from '@cucumber/cucumber'
import  ScreenshotHelper from '../utils/screenshotHelper.js'

Before(function (scenario) {
    // Define as informações do teste
    this.testKey = scenario.pickle.id; 
    this.testName = scenario.pickle.name;
    this.date = new Date().toISOString().split('T')[0];
    this.status = 'Pass'; // Supondo que passa, mudamos para "Fail" se der erro
    this.environment = process.env.TEST_ENV || 'Homologação';

    // Resetar a lista de screenshots para cada novo cenário
    this.screenshotHelper.screenshots = [];
});

// Captura screenshots apenas quando um passo falha
AfterStep(async function (step) {
    if (step.result.status === 'FAILED') {
        const driver = browser; // WebDriverIO
        await this.screenshotHelper.takeScreenshot(driver, this.testKey);
        this.status = 'Fail'; // Marca o status como falha
    }
});

// Gera o PDF no final do cenário
After(async function () {
    const pdfPath = await this.screenshotHelper.generatePDF(
        this.testKey,
        this.testName,
        this.date,
        this.status,
        this.environment
    );
    console.log(`📄 Evidência gerada: ${pdfPath}`);
});