describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/products')
  })

  it(`Should permit click on toggle button`, () => {
    const cmp = cy.visit('http://localhost:4200/products')

    const button = cy.get('button').first()
    button.click()
    button.should('have.class', 'clicked-btn')
    
  })
})