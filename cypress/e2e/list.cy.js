import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";


describe('Страница "Очередь"', function() {
    beforeEach(() => {
        cy.visit('/list');
    })

    it('Если в инпутах "Введите значение" пусто, то все кнопки добавления недоступны', () => {
        cy.get('.text_type_input').eq(0).invoke('val').then((val) => {
            if (val === '') {
                cy.contains('button', 'Добавить в head').should('be.disabled');
                cy.contains('button', 'Добавить в tail').should('be.disabled');
                cy.contains('button', 'Добавить по индексу').should('be.disabled');
            } else {
                cy.contains('button', 'Добавить в head').should('be.enabled');
                cy.contains('button', 'Добавить в tail').should('be.enabled');
                cy.contains('button', 'Добавить по индексу').should('be.enabled');
            }
        });
    });

    it('Если в инпуте "Введите индекс" пусто, то кнопки "Добавить по индексу" и "Удалить по индексу" недоступны', () => {
        cy.get('.text_type_input').eq(1).invoke('val').then((val) => {
            if (val === '') {
                cy.contains('button', 'Добавить по индексу').should('be.disabled');
                cy.contains('button', 'Удалить по индексу').should('be.disabled');
            } else {
                cy.contains('button', 'Добавить по индексу').should('be.enabled');
                cy.contains('button', 'Удалить по индексу').should('be.enabled');
            }
        });
    });

    it('Проверка отрисовки дефолтного списка', () => {
        const defaultList = [0, 34, 8, 1];

        cy.get('*[class^="circle_content_"]').eq(0).children().eq(0).should('have.text', 'head');
        cy.get('.text_type_circle').each((val, index) => {
            cy.wrap(val).should('have.text', defaultList[index]);
        });
        cy.get('*[class^="circle_content_"]').each((val, index) => {
            cy.wrap(val).children().eq(2).should('have.text', index);
        });
        cy.get('*[class^="circle_content_"]').eq(3).children().eq(3).should('have.text', 'tail');
    });

    it('Проверка  добавления элемента в head', () => {
        cy.get('.text_type_input').eq(0).type(1);
        cy.contains('button', 'Добавить в head').click();

        cy.get('*[class^="circle_content_"]').eq(0).children().eq(0).children().first().invoke('attr', 'class').should('include', 'circle_content_');
        cy.get('*[class^="circle_content_"]').eq(0).children().eq(0).children().first().children().eq(1).should('have.text', 1);
        cy.get('*[class^="circle_content_"]').eq(0).children().eq(0).children().first().children().eq(1).invoke('attr', 'class').should('include', 'circle_changing_');

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('*[class^="circle_circle_"]').eq(0).invoke('attr', 'class').should('include', 'circle_modified_');
        cy.get('*[class^="circle_content_"]').eq(0).children().eq(0).should('have.text', 'head');
        cy.get('*[class^="circle_content_"]').get('.text_type_circle').eq(0).should('have.text', '1');
        cy.get('*[class^="circle_content_"]').eq(0).children().eq(2).should('have.text', '0');

        cy.get('*[class^="circle_content_"]').eq(1).children().eq(0).should('have.text', '');

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('*[class^="circle_circle_"]').eq(0).invoke('attr', 'class').should('include', 'circle_default_');

        cy.get('section[class^="list-page_listArea_"]').children().should('have.length', 5);
    });

    it('Проверка добавления элемента в tail', () => {
        cy.get('.text_type_input').eq(0).type(5);
        cy.contains('button', 'Добавить в tail').click();

        cy.get('*[class^="circle_content_"]').eq(3).children().first().children().first().invoke('attr', 'class').should('include', 'circle_content_');
        cy.get('*[class^="circle_content_"]').eq(3).children().first().children().first().children().eq(1).should('have.text', 5);
        cy.get('*[class^="circle_content_"]').eq(3).children().first().children().first().children().eq(1).invoke('attr', 'class').should('include', 'circle_changing_');

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('*[class^="circle_circle_"]').last().invoke('attr', 'class').should('include', 'circle_modified_');
        cy.get('*[class^="circle_content_"]').last().children().last().should('have.text', 'tail');
        cy.get('*[class^="circle_content_"]').get('.text_type_circle').last().should('have.text', '5');
        cy.get('*[class^="circle_content_"]').last().children().eq(2).should('have.text', '4');
        cy.get('*[class^="circle_content_"]').last().children().eq(3).should('have.text', 'tail');

        cy.get('*[class^="circle_content_"]').eq(3).children().eq(3).should('have.text', '');

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('*[class^="circle_circle_"]').eq(0).invoke('attr', 'class').should('include', 'circle_default_');

        cy.get('section[class^="list-page_listArea_"]').children().should('have.length', 5);
    });

    it('Проверка добавления элемента по индексу', () => {

    });

    it('Проверка удаления элемента из head', () => {

    });

    it('Проверка удаления элемента из tail', () => {

    });

    it('Проверка удаления элемента по индексу', () => {

    });
});