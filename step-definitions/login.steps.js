import { Given, When, Then, After} from '@wdio/cucumber-framework'
import { expect, $ } from '@wdio/globals'
import LoginPage from '../page/login.page.js'
import ScreenshotHelper from '../helpers/evidenceHelper.js'

const pages = {
    login: LoginPage
}
Given('realizo login {string} {string}', async (cnpj, password) => {
    await LoginPage.login(cnpj, password)
    await ScreenshotHelper.takeScreenshot('login');

})

When('clico no botao continuar', async () => {
    await LoginPage.clickBtnContinuar()

})

Then('devera exibir a tela inicial', async () => {
    await LoginPage.home()
    await ScreenshotHelper.takeScreenshot('home');
})





