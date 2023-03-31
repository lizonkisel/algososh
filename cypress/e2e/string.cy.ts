import { DELAY_IN_MS } from "../../src/constants/delays";
import { checkDisabledButton, checkEnabledButton, checkAmountOfCircles, checkClassOfElementIncludes } from "./utils/utils";

describe('Страница "Строка"', function() {
    it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
      cy.visit('/recursion');
        cy.get('.text_type_input').invoke('val').then((val) => {
            if (val === '') {
                checkDisabledButton('Развернуть');
            } else {
                checkEnabledButton('Развернуть');
            }
        });
    });

    it('Проверка корректности разворота строки с чётным количеством элементов', () => {
        cy.visit('/recursion');;

        cy.get('.text_type_input').type('data');
        cy.contains('button', 'Развернуть').click();

        checkAmountOfCircles('*[class^="circle_content_"]', 4);

        // cy.get('*[class^="circle_circle_"]').eq(0).invoke('attr', 'class').should('include', 'circle_changing_');
        // cy.get('*[class^="circle_circle_"]').eq(3).invoke('attr', 'class').should('include', 'circle_changing_');
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(0), 'circle_changing_');
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(3), 'circle_changing_');


        cy.wait(DELAY_IN_MS)
        cy.get('*[class^="circle_content_"]').get('.text_type_circle').eq(0).should('have.text', 'a');
        cy.get('*[class^="circle_content_"]').get('.text_type_circle').eq(3).should('have.text', 'd');

        cy.wait(DELAY_IN_MS);
        // cy.get('*[class^="circle_circle_"]').eq(0).invoke('attr', 'class').should('include', 'circle_modified_');
        // cy.get('*[class^="circle_circle_"]').eq(3).invoke('attr', 'class').should('include', 'circle_modified_');
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(0), 'circle_modified_');
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(3), 'circle_modified_');

        cy.wait(DELAY_IN_MS);
        // cy.get('*[class^="circle_circle_"]').eq(1).invoke('attr', 'class').should('include', 'circle_changing_');
        // cy.get('*[class^="circle_circle_"]').eq(2).invoke('attr', 'class').should('include', 'circle_changing_');
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(1), 'circle_changing_');
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(2), 'circle_changing_');

        cy.wait(DELAY_IN_MS)
        cy.get('*[class^="circle_content_"]').get('.text_type_circle').eq(1).should('have.text', 't');
        cy.get('*[class^="circle_content_"]').get('.text_type_circle').eq(2).should('have.text', 'a');

        cy.wait(DELAY_IN_MS);
        // cy.get('*[class^="circle_circle_"]').eq(1).invoke('attr', 'class').should('include', 'circle_modified_');
        // cy.get('*[class^="circle_circle_"]').eq(2).invoke('attr', 'class').should('include', 'circle_modified_');
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(1), 'circle_modified_');
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(2), 'circle_modified_');
      });

    it('Проверка корректности разворота строки с нечётным количеством элементов', () => {
        cy.visit('/recursion');;

        cy.get('.text_type_input').type('world');
        cy.contains('button', 'Развернуть').click();

        checkAmountOfCircles('*[class^="circle_content_"]', 5);

        // cy.get('*[class^="circle_circle_"]').eq(0).invoke('attr', 'class').should('include', 'circle_changing_');
        // cy.get('*[class^="circle_circle_"]').eq(4).invoke('attr', 'class').should('include', 'circle_changing_');
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(0), 'circle_changing_');
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(4), 'circle_changing_');

        cy.wait(DELAY_IN_MS)
        cy.get('*[class^="circle_content_"]').get('.text_type_circle').eq(0).should('have.text', 'd');
        cy.get('*[class^="circle_content_"]').get('.text_type_circle').eq(4).should('have.text', 'w');

        cy.wait(DELAY_IN_MS);
        // cy.get('*[class^="circle_circle_"]').eq(0).invoke('attr', 'class').should('include', 'circle_modified_');
        // cy.get('*[class^="circle_circle_"]').eq(4).invoke('attr', 'class').should('include', 'circle_modified_');
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(0), 'circle_modified_');
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(4), 'circle_modified_');

        cy.wait(DELAY_IN_MS);
        // cy.get('*[class^="circle_circle_"]').eq(1).invoke('attr', 'class').should('include', 'circle_changing_');
        // cy.get('*[class^="circle_circle_"]').eq(3).invoke('attr', 'class').should('include', 'circle_changing_');
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(1), 'circle_changing_');
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(3), 'circle_changing_');

        cy.wait(DELAY_IN_MS)
        cy.get('*[class^="circle_content_"]').get('.text_type_circle').eq(1).should('have.text', 'l');
        cy.get('*[class^="circle_content_"]').get('.text_type_circle').eq(3).should('have.text', 'o');

        cy.wait(DELAY_IN_MS);
        // cy.get('*[class^="circle_circle_"]').eq(1).invoke('attr', 'class').should('include', 'circle_modified_');
        // cy.get('*[class^="circle_circle_"]').eq(3).invoke('attr', 'class').should('include', 'circle_modified_');
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(1), 'circle_modified_');
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(3), 'circle_modified_');

        cy.wait(DELAY_IN_MS);
        // cy.get('*[class^="circle_circle_"]').eq(2).invoke('attr', 'class').should('include', 'circle_modified_');
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(2), 'circle_modified_');
    });

    it('Проверка корректности разворота строки с одним элементом', () => {
        cy.visit('/recursion');;

        cy.get('.text_type_input').type('A');
        cy.contains('button', 'Развернуть').click();

        checkAmountOfCircles('*[class^="circle_content_"]', 1);

        // cy.get('*[class^="circle_circle_"]').eq(0).invoke('attr', 'class').should('include', 'circle_modified_');
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(0), 'circle_modified_');
    });
  });
