import axios from 'axios'

class AzureHelper {
    constructor() {
        this.azureUrl = 'https://dev.azure.com/seu-org';
        this.auth = {
            username: 'seu-usuario',
            password: 'seu-token-pessoal'
        };
    }

    async uploadEvidence(testName, filePath) {
        const response = await axios.post(`${this.azureUrl}/_apis/test/Runs/1/Results/100000/attachments?api-version=6.1-preview.1`, {
            fileName: `${testName}.png`,
            comment: "Evidência do teste",
            attachmentType: "GeneralAttachment",
            stream: fs.readFileSync(filePath).toString('base64')
        }, { auth: this.auth });

        console.log('Evidência enviada para Azure:', response.data);
    }
}

export default new AzureHelper();