Feature: BrinksPay login

  Scenario Outline: Realizar login com sucesso 

    Given realizo login '<cnpj>' '<password>'
    When clico no botao continuar
    Then devera exibir a tela inicial
    

    Examples:
      | cnpj | password            |
      | 59868116000190 | Brinks#24 |
      
