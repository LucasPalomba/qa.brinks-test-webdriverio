import fs from 'fs';

class EvidenceHelper {
    async takeScreenshot(testName) {
        const filePath = `./reports/${testName}-${Date.now()}.png`;
        await browser.saveScreenshot(filePath);
        console.log(`Screenshot salvo em: ${filePath}`);
        return filePath; 
    }
}

export default new EvidenceHelper(); 