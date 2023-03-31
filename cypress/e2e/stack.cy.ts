import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { checkDisabledButton, checkEnabledButton, checkAmountOfCircles, checkClassOfElementIncludes } from "./utils/utils";

describe('Страница "Стэк"', function() {
    beforeEach(() => {
        cy.visit('/stack');
    })

    it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('.text_type_input').invoke('val').then((val) => {
            if (val === '') {
                checkDisabledButton('Добавить');
            } else {
                checkEnabledButton('Добавить');
            }
        });
    });

    it('Проверка правильности добавления элемента в стек', () => {
        cy.get('input[class*=text_type_input]').type('d');
        cy.contains('button', 'Добавить').click();

        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(0), 'circle_changing_');
        cy.get('[class^="stack-page_stack__top_"]').eq(0).should('have.text', 'top');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(0).children().eq(2).should('have.text', '0');
        

        cy.wait(SHORT_DELAY_IN_MS);
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(0), 'circle_default_');

        checkAmountOfCircles('*[class^="circle_content_"]', 1);

        cy.get('input[class*=text_type_input]').type('a');
        cy.contains('button', 'Добавить').click();

        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(1), 'circle_changing_');
        cy.get('[class^="stack-page_stack__top_"]').eq(0).should('have.text', '');
        cy.get('[class^="stack-page_stack__top_"]').eq(1).should('have.text', 'top');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(0).children().eq(2).should('have.text', '0');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(1).children().eq(2).should('have.text', '1');


        cy.wait(SHORT_DELAY_IN_MS);
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(1), 'circle_default_');

        checkAmountOfCircles('*[class^="circle_content_"]', 2);


        cy.get('input[class*=text_type_input]').type('t');
        cy.contains('button', 'Добавить').click();

        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(2), 'circle_changing_');
        cy.get('[class^="stack-page_stack__top_"]').eq(0).should('have.text', '');
        cy.get('[class^="stack-page_stack__top_"]').eq(1).should('have.text', '');
        cy.get('[class^="stack-page_stack__top_"]').eq(2).should('have.text', 'top');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(0).children().eq(2).should('have.text', '0');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(1).children().eq(2).should('have.text', '1');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(2).children().eq(2).should('have.text', '2');


        cy.wait(SHORT_DELAY_IN_MS);
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(2), 'circle_default_');

        checkAmountOfCircles('*[class^="circle_content_"]', 3);

        
        cy.get('input[class*=text_type_input]').type('a');
        cy.contains('button', 'Добавить').click();

        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(3), 'circle_changing_');
        cy.get('[class^="stack-page_stack__top_"]').eq(0).should('have.text', '');
        cy.get('[class^="stack-page_stack__top_"]').eq(1).should('have.text', '');
        cy.get('[class^="stack-page_stack__top_"]').eq(2).should('have.text', '');
        cy.get('[class^="stack-page_stack__top_"]').eq(3).should('have.text', 'top');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(0).children().eq(2).should('have.text', '0');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(1).children().eq(2).should('have.text', '1');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(2).children().eq(2).should('have.text', '2');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(3).children().eq(2).should('have.text', '3');


        cy.wait(SHORT_DELAY_IN_MS);
        checkClassOfElementIncludes(cy.get('*[class^="circle_circle_"]').eq(3), 'circle_default_');

        checkAmountOfCircles('*[class^="circle_content_"]', 4);
    });

    it('Проверка правильности удаления элемента из стека', () => {
        cy.get('input[class*=text_type_input]').type('h');
        cy.contains('button', 'Добавить').click();

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('input[class*=text_type_input]').type('i');
        cy.contains('button', 'Добавить').click();

        cy.wait(SHORT_DELAY_IN_MS);
        checkAmountOfCircles('*[class^="circle_content_"]', 2);
        cy.get('[class^="stack-page_stack__top_"]').eq(0).should('have.text', '');
        cy.get('[class^="stack-page_stack__top_"]').eq(1).should('have.text', 'top');
        cy.get('.text_type_circle').eq(0).should('have.text', 'h');
        cy.get('.text_type_circle').eq(1).should('have.text', 'i');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(0).children().eq(2).should('have.text', '0');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(1).children().eq(2).should('have.text', '1');

        cy.contains('button', 'Удалить').click();

        cy.wait(SHORT_DELAY_IN_MS);
        checkAmountOfCircles('*[class^="circle_content_"]', 1);
        cy.get('[class^="stack-page_stack__top_"]').eq(0).should('have.text', 'top');
        cy.get('.text_type_circle').eq(0).should('have.text', 'h');
        cy.get('div[class^="stack-page_stackArea__stack_"]').eq(0).children().eq(2).should('have.text', '0');
    });

    it('Проверка поведения кнопки «Очистить»', () => {
        cy.get('input[class*=text_type_input]').type('h');
        cy.contains('button', 'Добавить').click();

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('input[class*=text_type_input]').type('i');
        cy.contains('button', 'Добавить').click();

        cy.wait(SHORT_DELAY_IN_MS);
        checkAmountOfCircles('*[class^="circle_content_"]', 2);

        cy.contains('button', 'Очистить').click();

        cy.wait(SHORT_DELAY_IN_MS);
        checkAmountOfCircles('*[class^="circle_content_"]', 0);
    });

});