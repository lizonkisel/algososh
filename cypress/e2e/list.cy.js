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


});