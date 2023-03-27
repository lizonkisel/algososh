describe('Проверяем работу роутинга приложения', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    // before(() => {
    //     cy.location();
    //     cy.visit('/');
    //     cy.location();
    // });

    it('Открывается стартовая страница', () => {
        cy.contains('МБОУ АЛГОСОШ');
        cy.location();
    })

    it('Открывается страница "Строка"', () => {
        cy.get('a[href="/algososh/recursion"]').click();
        cy.get('button').contains('К оглавлению').click();

        cy.location('href').should('eq', 'http://localhost:3000/algososh/');

        /* Это более сложная реализация той же проверки на текущий url.
        Используется, когда нужно сделать несколько утверждений (assertions) */
        // cy.location().should((loc) => {
        //     expect(loc.href).to.eq('http://localhost:3000/algososh/');
        // });
    })

    it('Открывается страница "Последовательность Фибоначчи"', () => {
        cy.get('a[href="/algososh/fibonacci"]').click();
        cy.get('button').contains('К оглавлению').click();
        cy.location().should((loc) => {
            expect(loc.href).to.eq('http://localhost:3000/algososh/');
        });
    })

    it('Открывается страница "Сортировка массива"', () => {
        cy.get('a[href="/algososh/sorting"]').click();
        cy.get('button').contains('К оглавлению').click();
        cy.location().should((loc) => {
            expect(loc.href).to.eq('http://localhost:3000/algososh/');
        });
    })

    it('Открывается страница "Стек"', () => {
        cy.get('a[href="/algososh/stack"]').click();
        cy.get('button').contains('К оглавлению').click();
        cy.location().should((loc) => {
            expect(loc.href).to.eq('http://localhost:3000/algososh/');
        });
    })

    it('Открывается страница "Очередь"', () => {
        cy.get('a[href="/algososh/queue"]').click();
        cy.get('button').contains('К оглавлению').click();
        cy.location().should((loc) => {
            expect(loc.href).to.eq('http://localhost:3000/algososh/');
        });
    })

    it('Открывается страница "Связный список"', () => {
        cy.get('a[href="/algososh/list"]').click();
        cy.get('button').contains('К оглавлению').click();
        cy.location().should((loc) => {
            expect(loc.href).to.eq('http://localhost:3000/algososh/');
        });
    })

});
