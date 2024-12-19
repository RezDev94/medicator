describe('e2e', () => {
	beforeEach(() => cy.visit('/'));

	it('should display the title', () => {
		cy.get('.app-name').should('be.visible');
	});

	it('should add new medication and search', () => {
		cy.get('.add-medication button').click();

		cy.get('.mat-mdc-dialog-title').should('be.visible');

		cy.get('input[formcontrolname="name"]').type('Aspirin');
		cy.get('input[formcontrolname="value"]').type('2');
		cy.get('mat-select[formcontrolname="unit"]').click();
		cy.get('[ng-reflect-value="capsules"]').click();
		cy.get('mat-button-toggle[value="all"]').click();
		cy.get('mat-timepicker-toggle').click();
		cy.get('.mat-timepicker-panel mat-option:first-child').click();
		cy.get('mat-dialog-actions button:first-child').click();

		cy.get('td.mat-mdc-cell').should('be.visible').contains('Aspirin');

		cy.get('.search-form-wrapper input[formcontrolname="key"]').type('asp');
		cy.wait(1000);
		cy.get('td.mat-mdc-cell').should('be.visible').contains('Aspirin');

		cy.get('.search-form-wrapper input[formcontrolname="key"]').clear().type('reza');
		cy.wait(1000);
		cy.get('.empty-table.show-empty').should('be.visible');
	});
});
