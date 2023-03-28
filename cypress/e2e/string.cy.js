import { DELAY_IN_MS } from "../../src/constants/delays";

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

    it('Проверка корректности разворота строки с чётным количеством элементов', () => {
        cy.visit('/recursion');;

        cy.get('.text_type_input').type('data');
        cy.contains('button', 'Развернуть').click();

        // cy.get('.circle_content__SVUBY').should('have.length', 4);
        cy.get('*[class^="circle_content_"]').should('have.length', 4);

        // cy.get('.circle_circle__QosZX').eq(0).invoke('attr', 'class').should('include', 'circle_changing_');
        cy.get('*[class^="circle_circle_"]').eq(0).invoke('attr', 'class').should('include', 'circle_changing_');
        cy.get('*[class^="circle_circle_"]').eq(3).invoke('attr', 'class').should('include', 'circle_changing_');

        cy.wait(DELAY_IN_MS)
        cy.get('*[class^="circle_content_"]').get('.text_type_circle').eq(0).should('have.text', 'a');
        cy.get('*[class^="circle_content_"]').get('.text_type_circle').eq(3).should('have.text', 'd');

        cy.wait(DELAY_IN_MS);
        cy.get('*[class^="circle_circle_"]').eq(0).invoke('attr', 'class').should('include', 'circle_modified_');
        cy.get('*[class^="circle_circle_"]').eq(3).invoke('attr', 'class').should('include', 'circle_modified_');

        cy.wait(DELAY_IN_MS);
        cy.get('*[class^="circle_circle_"]').eq(1).invoke('attr', 'class').should('include', 'circle_changing_');
        cy.get('*[class^="circle_circle_"]').eq(2).invoke('attr', 'class').should('include', 'circle_changing_');

        cy.wait(DELAY_IN_MS)
        cy.get('*[class^="circle_content_"]').get('.text_type_circle').eq(1).should('have.text', 't');
        cy.get('*[class^="circle_content_"]').get('.text_type_circle').eq(2).should('have.text', 'a');

        cy.wait(DELAY_IN_MS);
        cy.get('*[class^="circle_circle_"]').eq(1).invoke('attr', 'class').should('include', 'circle_modified_');
        cy.get('*[class^="circle_circle_"]').eq(2).invoke('attr', 'class').should('include', 'circle_modified_');
      });

    it('Проверка корректности разворота строки с нечётным количеством элементов', () => {
        cy.visit('/recursion');;

        cy.get('.text_type_input').type('world');
        cy.contains('button', 'Развернуть').click();

        cy.get('*[class^="circle_content_"]').should('have.length', 5);

        cy.get('*[class^="circle_circle_"]').eq(0).invoke('attr', 'class').should('include', 'circle_changing_');
        cy.get('*[class^="circle_circle_"]').eq(4).invoke('attr', 'class').should('include', 'circle_changing_');

        cy.wait(DELAY_IN_MS)
        cy.get('*[class^="circle_content_"]').get('.text_type_circle').eq(0).should('have.text', 'd');
        cy.get('*[class^="circle_content_"]').get('.text_type_circle').eq(4).should('have.text', 'w');

        cy.wait(DELAY_IN_MS);
        cy.get('*[class^="circle_circle_"]').eq(0).invoke('attr', 'class').should('include', 'circle_modified_');
        cy.get('*[class^="circle_circle_"]').eq(4).invoke('attr', 'class').should('include', 'circle_modified_');

        cy.wait(DELAY_IN_MS);
        cy.get('*[class^="circle_circle_"]').eq(1).invoke('attr', 'class').should('include', 'circle_changing_');
        cy.get('*[class^="circle_circle_"]').eq(3).invoke('attr', 'class').should('include', 'circle_changing_');

        cy.wait(DELAY_IN_MS)
        cy.get('*[class^="circle_content_"]').get('.text_type_circle').eq(1).should('have.text', 'l');
        cy.get('*[class^="circle_content_"]').get('.text_type_circle').eq(3).should('have.text', 'o');

        cy.wait(DELAY_IN_MS);
        cy.get('*[class^="circle_circle_"]').eq(1).invoke('attr', 'class').should('include', 'circle_modified_');
        cy.get('*[class^="circle_circle_"]').eq(3).invoke('attr', 'class').should('include', 'circle_modified_');

        cy.wait(DELAY_IN_MS);
        cy.get('*[class^="circle_circle_"]').eq(2).invoke('attr', 'class').should('include', 'circle_modified_');
    });

    it('Проверка корректности разворота строки с одним элементом', () => {
        cy.visit('/recursion');;

        cy.get('.text_type_input').type('A');
        cy.contains('button', 'Развернуть').click();

        cy.get('*[class^="circle_content_"]').should('have.length', 1);

        cy.get('*[class^="circle_circle_"]').eq(0).invoke('attr', 'class').should('include', 'circle_modified_');
    });
  });
