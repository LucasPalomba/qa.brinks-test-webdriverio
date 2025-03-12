import PDFDocument from 'pdfkit'
import fs from 'fs'
import os from 'os'
import ip from 'ip'
import sizeOf from 'image-size'
import path from 'path'

export default class ScreenshotHelper {
    constructor() {
        this.screenshots = []; // Lista de screenshots
    }

    // Método para salvar o screenshot e armazenar o caminho
    async takeScreenshot(driver, testKey) {
        const screenshotPath = `./screenshots/${testKey}_${Date.now()}.png`;
        await driver.saveScreenshot(screenshotPath);
        this.screenshots.push(screenshotPath);
    }

    // 📸 Novo método para capturar a evidência
    static  tirarScreenshot() {
        // Aqui você coloca o código para capturar a evidência
        console.log("Screenshot capturado!");
    }

    // Método para gerar o PDF de evidências
    generatePDF(testKey, nameCt, date, status, environment) {
        return new Promise((resolve, reject) => {
            const outputPath = `./Evidences/${date} - ${testKey} - ${status}.pdf`;
            const doc = new PDFDocument({ size: 'A2' });
            const stream = fs.createWriteStream(outputPath);
            doc.pipe(stream);

            const host = os.userInfo();
            let color = status.toLowerCase().includes('pass') ? 'green' : 'red';

            // Cabeçalho
            doc.image('./images/logo.png', 60, 90, { width: 150 })
                .fillColor('#000')
                .fontSize(16).text(testKey, 275, 50, { align: 'right' })
                .fontSize(14).text(nameCt, { align: 'right' })
                .text(environment, { align: 'right' })
                .moveDown()
                .fillColor(color).text(status, { align: 'right' })
                .fill('black')
                .text(date, { align: 'right' })
                .moveDown()
                .text(host.username, { align: 'right' })
                .text(os.type(), { align: 'right' })
                .text(ip.address(), { align: 'right' });

            doc.moveTo(50, 240).lineTo(1150, 240).stroke().moveDown(5);

            let y = 370;
            let scaleImage = 0.28;

            this.screenshots.forEach((screenshot, index) => {
                let dimensions = sizeOf(screenshot);
                if (dimensions.width < 2000) {
                    scaleImage = 0.48;
                }

                let x = index % 2 === 0 ? 100 : 600;

                doc.fillColor('#000')
                    .fontSize(20)
                    .text(path.basename(screenshot, '.png'), x, y - 70)
                    .image(screenshot, x, y, { scale: scaleImage });

                if (index % 2 !== 0) {
                    y += 700;
                }
            });

            doc.end();
            stream.on('finish', () => resolve(outputPath));
            stream.on('error', reject);
        });
    }
}