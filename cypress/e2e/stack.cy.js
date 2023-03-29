import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";


describe('Страница "Стэк"', function() {
    beforeEach(() => {
        cy.visit('/stack');
    })

    it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('.text_type_input').invoke('val').then((val) => {
            if (val === '') {
                cy.contains('button', 'Добавить').should('be.disabled')
            } else {
                cy.contains('button', 'Добавить').should('be.enabled')
            }
        });
    });

    it('Проверка правильности добавления элемента в стек', () => {
        // cy.get('.text_type_input').type('d');
        cy.get('input[class*=text_type_input]').type('d');
        cy.contains('button', 'Добавить').click();

        cy.get('*[class^="circle_circle_"]').eq(0).invoke('attr', 'class').should('include', 'circle_changing_');
        // cy.get('section[class^="stack-page_stackArea_"]').children().eq(0).get('[class^="stack-page_stack__top_"]').should('have.text', 'top');
        // cy.get('section[class^="stack-page_stackArea_"]').children().eq(0).get('div[class^="stack-page_stackArea__stack_"]').children().eq(2).should('have.text', '0');
        cy.get('[class^="stack-page_stack__top_"]').eq(0).should('have.text', 'top');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(0).children().eq(2).should('have.text', '0');
        

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('*[class^="circle_circle_"]').eq(0).invoke('attr', 'class').should('include', 'circle_default_');

        cy.get('section[class^="stack-page_stackArea_"]').children().should('have.length', 1);
        

        cy.get('input[class*=text_type_input]').type('a');
        cy.contains('button', 'Добавить').click();

        cy.get('*[class^="circle_circle_"]').eq(1).invoke('attr', 'class').should('include', 'circle_changing_');
        // cy.get('section[class^="stack-page_stackArea_"]').children().eq(0).get('[class^="stack-page_stack__top_"]').should('have.text', '');
        // cy.get('section[class^="stack-page_stackArea_"]').children().eq(1).get('[class^="stack-page_stack__top_"]').should('have.text', 'top');
        cy.get('[class^="stack-page_stack__top_"]').eq(0).should('have.text', '');
        cy.get('[class^="stack-page_stack__top_"]').eq(1).should('have.text', 'top');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(0).children().eq(2).should('have.text', '0');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(1).children().eq(2).should('have.text', '1');


        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('*[class^="circle_circle_"]').eq(1).invoke('attr', 'class').should('include', 'circle_default_');

        cy.get('section[class^="stack-page_stackArea_"]').children().should('have.length', 2);


        cy.get('input[class*=text_type_input]').type('t');
        cy.contains('button', 'Добавить').click();

        cy.get('*[class^="circle_circle_"]').eq(2).invoke('attr', 'class').should('include', 'circle_changing_');
        cy.get('[class^="stack-page_stack__top_"]').eq(0).should('have.text', '');
        cy.get('[class^="stack-page_stack__top_"]').eq(1).should('have.text', '');
        cy.get('[class^="stack-page_stack__top_"]').eq(2).should('have.text', 'top');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(0).children().eq(2).should('have.text', '0');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(1).children().eq(2).should('have.text', '1');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(2).children().eq(2).should('have.text', '2');


        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('*[class^="circle_circle_"]').eq(2).invoke('attr', 'class').should('include', 'circle_default_');

        cy.get('section[class^="stack-page_stackArea_"]').children().should('have.length', 3);

        
        cy.get('input[class*=text_type_input]').type('a');
        cy.contains('button', 'Добавить').click();

        cy.get('*[class^="circle_circle_"]').eq(3).invoke('attr', 'class').should('include', 'circle_changing_');
        cy.get('[class^="stack-page_stack__top_"]').eq(0).should('have.text', '');
        cy.get('[class^="stack-page_stack__top_"]').eq(1).should('have.text', '');
        cy.get('[class^="stack-page_stack__top_"]').eq(2).should('have.text', '');
        cy.get('[class^="stack-page_stack__top_"]').eq(3).should('have.text', 'top');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(0).children().eq(2).should('have.text', '0');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(1).children().eq(2).should('have.text', '1');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(2).children().eq(2).should('have.text', '2');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(3).children().eq(2).should('have.text', '3');


        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('*[class^="circle_circle_"]').eq(3).invoke('attr', 'class').should('include', 'circle_default_');


        // cy.wait(SHORT_DELAY_IN_MS);
        cy.get('section[class^="stack-page_stackArea_"]').children().should('have.length', 4);
    });

    it('Проверка правильности удаления элемента из стека', () => {

    })
});