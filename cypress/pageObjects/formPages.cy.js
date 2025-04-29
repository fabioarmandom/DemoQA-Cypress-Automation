import { faker } from '@faker-js/faker';


const CONFIG = {
  BASE_URL: 'https://demoqa.com',
  FORM_URL: 'https://demoqa.com/forms',
  PRACTICE_FORM_URL: 'https://demoqa.com/automation-practice-form',
  SAMPLE_IMAGE_PATH: 'cypress/fixtures/phototest.jpg', 
  DEFAULT_STATE: 'Uttar Pradesh',
  DEFAULT_CITY: 'Agra',
};


class FormPage {
  
  elements = {
    formsButton: () => cy.contains('.card-body', 'Forms'),
    practiceFormButton: () => cy.contains('span.text', 'Practice Form'),
    practiceFormHeader: () => cy.get('h1.text-center'),
    firstNameInput: () => cy.get('#firstName'),
    lastNameInput: () => cy.get('#lastName'),
    userEmailInput: () => cy.get('#userEmail'),
    genderMaleRadio: () => cy.get('#gender-radio-1'),
    userNumberInput: () => cy.get('#userNumber'),
    dateOfBirthInput: () => cy.get('#dateOfBirthInput'),
    subjectsInput: () => cy.get('#subjectsInput'),
    hobbiesSportsCheckbox: () => cy.get('#hobbies-checkbox-1'),
    uploadPictureInput: () => cy.get('#uploadPicture'),
    currentAddressInput: () => cy.get('#currentAddress'),
    stateDropdown: () => cy.get('#state'),
    cityDropdown: () => cy.get('#city'),
    submitButton: () => cy.get('#submit'),
  };

  
  generateRandomName() {
    return faker.person.firstName(); 
  }

  generateRandomEmail() {
    return faker.internet.email();
  }

  generateRandomPhoneNumber() {
    return faker.string.numeric({ length: 10 }); 
  }

  
  navigateToForms() {
    this.elements.formsButton().click();
    cy.url().should('eq', CONFIG.FORM_URL);
    cy.screenshot('forms_page');
  }

  navigateToPracticeForm() {
    this.elements.practiceFormButton().click();
    cy.url().should('eq', CONFIG.PRACTICE_FORM_URL);
    this.elements.practiceFormHeader().should('have.text', 'Practice Form');
    cy.screenshot('practice_form_page');
  }

  
  fillPracticeForm() {
    this.elements.firstNameInput().type(this.generateRandomName());
    this.elements.lastNameInput().type(this.generateRandomName());
    this.elements.userEmailInput().type(this.generateRandomEmail());
    this.elements.genderMaleRadio().check({ force: true });
    this.elements.userNumberInput().type(this.generateRandomPhoneNumber());
    this.elements.subjectsInput().type('Maths{enter}Physics{enter}');
    this.elements.hobbiesSportsCheckbox().check({ force: true });
    this.elements.uploadPictureInput().selectFile(CONFIG.SAMPLE_IMAGE_PATH);
    this.elements.currentAddressInput().type('Santo Domingo, Republica Dominicana');
    this.elements.stateDropdown().click().contains(CONFIG.DEFAULT_STATE).click();
    this.elements.cityDropdown().click().contains(CONFIG.DEFAULT_CITY).click({ force: true });
  }

  selectDateOfBirth(day, month, year) {
    this.elements.dateOfBirthInput().click();
    cy.get('.react-datepicker__year-select').select(String(year));
    cy.get('.react-datepicker__month-select').select(month);
    cy.get('.react-datepicker__day:not(.react-datepicker__day--outside-month)')
      .contains(day)
      .click();
    cy.screenshot('date_of_birth_selected');
  }

  submitForm() {
    this.elements.submitButton().click({ force: true });
    cy.screenshot('form_submitted');
  }
}

export default new FormPage();