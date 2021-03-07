/// <reference types="Cypress" />

describe('Todo', () => {
    before(() => {
        cy.visit('/')
    })

    it("Add Todo", () => {
        cy.get('#todo-input').type('Learn Typescript')
        cy.get('#todo-add').click()

        cy.get('#todos-list').children().should('have.length', 1)
        cy.get('#todos-list').contains('Learn Typescript')
    })

    it("Mark Todo as Completed", () => {
        cy.get('#todo-0').should('have.class', 'incomplete')
        
        cy.get('#todo-0 .toggle-complete').click()
        
        cy.get('#todo-0').should('have.class', 'complete')
    })

    it("Delete Todo", () => {
        cy.get("#todo-0 .delete").click()
        cy.get('#todos-list').children().should('have.length', 0)
    })

    it("Generate Todos", () => {
        cy.intercept('https://localhost:5000/todos/generate', [{ text: 'my-todo', complete: false }])
        
        cy.get("#todo-generate").click()
        cy.get('#todo-0').contains('my-todo')
    })
})