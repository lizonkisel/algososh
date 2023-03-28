import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

function getFibonacciRow(n) {
    const arr = [1, 1];
    if (n === 1) {
      return arr;
    }
    for (let i = 2; i <= n; i++) {
      const value = arr[i - 2] + arr[i - 1];
      arr.push(value);
    }
    return arr;
};

const fullRow = getFibonacciRow(19);
const rowOfUnit = getFibonacciRow(1);

describe('Страница "Последовательность Фибоначчи"', function() {
  it('Проверка корректности генерации ряда Фибоначчи от "1"', () => {
    cy.visit('/fibonacci');;

    cy.get('.text_type_input').type('1');
    cy.contains('button', 'Развернуть').click();

    cy.wait(rowOfUnit.length * SHORT_DELAY_IN_MS);
    cy.get('*[class^="circle_content_"]').should('have.length', rowOfUnit.length);

    cy.get('.text_type_circle').each((val, index) => {
      const arrValue = rowOfUnit[index];
      cy.wrap(val).should('have.text', arrValue);
    });
});

    it('Проверка корректности генерации чисел', () => {
        cy.visit('/fibonacci');;

        cy.get('.text_type_input').type('19');
        cy.contains('button', 'Развернуть').click();

        cy.wait(fullRow.length * SHORT_DELAY_IN_MS);
        cy.get('*[class^="circle_content_"]').should('have.length', fullRow.length);

        cy.get('.text_type_circle').each((val, index) => {
          const arrValue = fullRow[index];
          cy.wrap(val).should('have.text', arrValue);
        });
    });
  });