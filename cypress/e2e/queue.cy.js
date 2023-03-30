import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";


describe('Страница "Очередь"', function() {
    beforeEach(() => {
        cy.visit('/queue');
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

    it('Проверка правильности добавления элемента в очередь', () => {
        cy.get('input[class*=text_type_input]').type('d');
        cy.contains('button', 'Добавить').click();

        cy.get('*[class^="circle_circle_"]').eq(0).invoke('attr', 'class').should('include', 'circle_changing_');
        cy.get('*[class^="circle_content_"]').eq(0).children().eq(0).should('have.text', 'head');
        cy.get('.text_type_circle').eq(0).should('have.text', 'd');
        cy.get('*[class^="circle_content_"]').eq(0).children().eq(2).should('have.text', '0');
        cy.get('*[class^="circle_content_"]').eq(0).children().eq(3).should('have.text', 'tail');

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('*[class^="circle_circle_"]').eq(0).invoke('attr', 'class').should('include', 'circle_default_');
        
        cy.get('input[class*=text_type_input]').type('a');
        cy.contains('button', 'Добавить').click();

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('input[class*=text_type_input]').type('t');
        cy.contains('button', 'Добавить').click();

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('input[class*=text_type_input]').type('a');
        cy.contains('button', 'Добавить').click();
;
        cy.get('*[class^="circle_content_"]').eq(0).children().eq(0).should('have.text', 'head');
        cy.get('.text_type_circle').eq(0).should('have.text', 'd');
        cy.get('*[class^="circle_content_"]').eq(0).children().eq(2).should('have.text', '0');
        cy.get('*[class^="circle_content_"]').eq(0).children().eq(3).should('have.text', '');

        cy.get('*[class^="circle_content_"]').eq(1).children().eq(0).should('have.text', '');
        cy.get('.text_type_circle').eq(1).should('have.text', 'a');
        cy.get('*[class^="circle_content_"]').eq(1).children().eq(2).should('have.text', '1');
        cy.get('*[class^="circle_content_"]').eq(1).children().eq(3).should('have.text', '');

        cy.get('*[class^="circle_content_"]').eq(2).children().eq(0).should('have.text', '');
        cy.get('.text_type_circle').eq(2).should('have.text', 't');
        cy.get('*[class^="circle_content_"]').eq(2).children().eq(2).should('have.text', '2');
        cy.get('*[class^="circle_content_"]').eq(2).children().eq(3).should('have.text', '');

        cy.get('*[class^="circle_content_"]').eq(3).children().eq(0).should('have.text', '');
        cy.get('.text_type_circle').eq(3).should('have.text', 'a');
        cy.get('*[class^="circle_content_"]').eq(3).children().eq(2).should('have.text', '3');
        cy.get('*[class^="circle_content_"]').eq(3).children().eq(3).should('have.text', 'tail');
    });

    it('Проверка правильности удаления элемента из очереди', () => {
        cy.get('input[class*=text_type_input]').type('h');
        cy.contains('button', 'Добавить').click();

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('input[class*=text_type_input]').type('i');
        cy.contains('button', 'Добавить').click();

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('*[class^="circle_content_"]').eq(0).children().eq(0).should('have.text', 'head');
        cy.get('.text_type_circle').eq(0).should('have.text', 'h');
        cy.get('*[class^="circle_content_"]').eq(0).children().eq(2).should('have.text', '0');
        cy.get('*[class^="circle_content_"]').eq(0).children().eq(3).should('have.text', '');

        cy.get('*[class^="circle_content_"]').eq(1).children().eq(0).should('have.text', '');
        cy.get('.text_type_circle').eq(1).should('have.text', 'i');
        cy.get('*[class^="circle_content_"]').eq(1).children().eq(2).should('have.text', '1');
        cy.get('*[class^="circle_content_"]').eq(1).children().eq(3).should('have.text', 'tail');

        cy.contains('button', 'Удалить').click();

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('*[class^="circle_content_"]').eq(0).children().eq(0).should('have.text', '');
        cy.get('.text_type_circle').eq(0).should('have.text', '');
        cy.get('*[class^="circle_content_"]').eq(0).children().eq(2).should('have.text', '0');
        cy.get('*[class^="circle_content_"]').eq(0).children().eq(3).should('have.text', '');

        cy.get('*[class^="circle_content_"]').eq(1).children().eq(0).should('have.text', 'head');
        cy.get('.text_type_circle').eq(1).should('have.text', 'i');
        cy.get('*[class^="circle_content_"]').eq(1).children().eq(2).should('have.text', '1');
        cy.get('*[class^="circle_content_"]').eq(1).children().eq(3).should('have.text', 'tail');
    });

    // it('Проверка поведения кнопки «Очистить»', () => {
    //     cy.get('input[class*=text_type_input]').type('h');
    //     cy.contains('button', 'Добавить').click();

    //     cy.wait(SHORT_DELAY_IN_MS);
    //     cy.get('input[class*=text_type_input]').type('i');
    //     cy.contains('button', 'Добавить').click();

    //     cy.wait(SHORT_DELAY_IN_MS);
    //     cy.get('section[class^="stack-page_stackArea_"]').children().should('have.length', 2);

    //     cy.contains('button', 'Очистить').click();

    //     cy.wait(SHORT_DELAY_IN_MS);
    //     cy.get('section[class^="stack-page_stackArea_"]').children().should('have.length', 0);
    // });

});