describe('Страница "Строка"', function() {
    it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
      cy.visit('/recursion');
        cy.get('.text_type_input').invoke('val').then((val) => {
            console.log('azaza');
            console.log(val);
            if (val === '') {
                cy.contains('button', 'Развернуть').should('be.disabled')
            } else {
                cy.contains('button', 'Развернуть').should('be.enabled')
            }
        });
    });
  }); 