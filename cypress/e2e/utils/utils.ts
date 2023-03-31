function checkDisabledButton(text: string) {
    cy.contains('button', text).should('be.disabled');
}

function checkEnabledButton(text: string) {
    cy.contains('button', text).should('be.enabled');
}

function checkAmountOfCircles(selector: string, expectedAmount: number) {
    cy.get(selector).should('have.length', expectedAmount);
}

function checkClassOfElementIncludes(element: Cypress.Chainable<JQuery<HTMLElement>>, partOfClassName: string) {
    element.invoke('attr', 'class').should('include', partOfClassName);
}

export {checkDisabledButton, checkEnabledButton, checkAmountOfCircles, checkClassOfElementIncludes};
