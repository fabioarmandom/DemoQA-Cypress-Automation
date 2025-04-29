import FormPage from '../../pageObjects/formPages.cy';

describe('DemoQA Form Submission Tests', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });

  it('Navigates to forms, fills the practice form, and submits', () => {
    cy.url().then((currentUrl) => {
      console.log('Current URL:', currentUrl);
    });

    FormPage.navigateToForms();
    FormPage.navigateToPracticeForm();
    FormPage.fillPracticeForm();
    FormPage.selectDateOfBirth('15', 'March', '1985');
    FormPage.submitForm();
  });

  it('Submits the form without selecting Date of Birth and verifies modal', () => {
    FormPage.navigateToForms();
    FormPage.navigateToPracticeForm();
    FormPage.fillPracticeForm();
    FormPage.submitForm();
    cy.get('.modal-title').should('exist'); 
  });
});