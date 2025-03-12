import { $ } from '@wdio/globals'



class LoginPage {
 
        get inputUsername() { return $('~accountInput') }  
        get inputPassword() { return $('~PasswordInput') }
        get btnEntrar() { return $('~finishButton') }
        get home() { return $('AccordionBalanceHeader')}

    async login (cnpj, password) {
        await this.inputUsername.setValue(cnpj)
        await this.inputPassword.setValue(password) 
    }
    async clickBtnContinuar () {
        await this.btnEntrar.click()
        await browser.pause(9000)
  }
    async home() {
        const elementoVisivel = await this.home()
        if (await elementoVisivel.isDisplayed()) {
        } else {
            console.log('tela inicial não está visivel');
        }
    }
}

export default new LoginPage();
