function checkDisabledButton(text: string) {
    cy.contains('button', text).should('be.disabled');
}

function checkEnabledButton(text: string) {
    cy.contains('button', text).should('be.enabled');
}

function checkAmountOfCircles(selector: string, expectedAmount: number) {
    cy.get(selector).should('have.length', expectedAmount);
}

export {checkDisabledButton, checkEnabledButton, checkAmountOfCircles};
