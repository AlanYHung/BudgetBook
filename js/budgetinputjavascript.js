'use strict';

var bijCategoryObjectArray = [];
var incomeInputObject = [];
var expenseInputObject = [];
var userFieldsetElement = document.getElementById('user-form');
var categoryFieldsetElement = document.getElementById('category-form');

// Adds Categories to the Select Drop Down
function categoryRender() {
  for (var i = 0; i < bijCategoryObjectArray.length; i++) {
    elementCreator('category-selection-options-id', 'option', bijCategoryObjectArray[i].categoryName, 'value', `category-${bijCategoryObjectArray[i].categoryName}`);
  }
}

function userFormSubmitHandler(ufsEvent) {
  ufsEvent.preventDefault();
  incomeInputObject.push(new IncomeObject('Income', ufsEvent.target.userIncomeInput.value, ufsEvent.target.incomeFrequencyInput.value, ufsEvent.target.incomeStartDateInput.value));
  userFieldsetElement.reset();
}

function categoryFormSubmitHandler(cfsEvent) {
  cfsEvent.preventDefault();
  expenseInputObject.push(new ExpenseObject(cfsEvent.target.categorySelectionOptions.value,cfsEvent.target.categoryAmountInput.value,document.getElementById('category-recurring-expense-input-id').checked,cfsEvent.target.categoryDateSelection.value,cfsEvent.target.categoryTransactionDescriptionInput.value))
  categoryFieldsetElement.reset();
}

bijCategoryObjectArray = defaultCategoryCreator();
categoryRender();
userFieldsetElement.addEventListener('submit', userFormSubmitHandler);
categoryFieldsetElement.addEventListener('submit', categoryFormSubmitHandler);
