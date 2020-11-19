'use strict';

var bijCategoryObjectArray = [];
var incomeInputObject = [];
var expenseInputObject = [];
var userFieldsetElement = document.getElementById('user-form');
var categoryFieldsetElement = document.getElementById('category-form');

// Adds Categories to the Select Drop Down
function categoryRender() {
  for (var i = 0; i < bijCategoryObjectArray.length; i++) {
    elementCreator('category-selection-options-id', 'option', bijCategoryObjectArray[i].categoryName, 'value', `${bijCategoryObjectArray[i].categoryName}`);
  }
}

function summaryPageLink(){
  //spl = summaryPageLink
  var splLinkElement = document.getElementById('budgetinput-summary-link').textContent;

  if(incomeInputObject.length > 0 && expenseInputObject.length > 0){
    if(splLinkElement === 'Summary Page'){
      // do nothing
    }else{
      elementCreator('budgetinput-summary-link', 'a', 'Summary Page', 'href', './budgetoutput.html');
    }
  }
}

function userFormSubmitHandler(ufsEvent) {
  ufsEvent.preventDefault();
  var ufsUserNameInput = ufsEvent.target.userNameInput.value
  var ufsUserIncomeInput = ufsEvent.target.userIncomeInput.value;

  incomeInputObject.push(new IncomeObject('Income', ufsUserIncomeInput));
  userFieldsetElement.reset();
  storeObjectsIntoLS(false, ufsUserNameInput, incomeInputObject);
  document.getElementById('user-name-input-id').value = ufsUserNameInput;
  summaryPageLink();
}

function categoryFormSubmitHandler(cfsEvent) {
  cfsEvent.preventDefault();
  var cfsCategoryExists = false;
  var cfsCategoryLocation = 0;
  var cfsSelectedCategory = cfsEvent.target.categorySelectionOptions.value;
  var cfsSelectedAmount = cfsEvent.target.categoryAmountInput.value;;
  var cfsRecurringFlag = document.getElementById('category-recurring-expense-input-id').checked;
  var cfsTransactionDate = cfsEvent.target.categoryDateSelection.value;
  var cfsTransactionDescription = cfsEvent.target.categoryTransactionDescriptionInput.value;

  for(var cfsIndex = 0; cfsIndex < expenseInputObject.length; cfsIndex++){
    if(expenseInputObject[cfsIndex].eoCategory === cfsSelectedCategory){
      cfsCategoryExists = true;
      cfsCategoryLocation = cfsIndex;
    }
  }

  if(cfsCategoryExists){
    expenseInputObject[cfsCategoryLocation].eoCategory = cfsSelectedCategory;
    expenseInputObject[cfsCategoryLocation].eoAmount = cfsSelectedAmount;
    expenseInputObject[cfsCategoryLocation].eoRecurring = cfsRecurringFlag;
    expenseInputObject[cfsCategoryLocation].eoTransactionDate = cfsTransactionDate;
    expenseInputObject[cfsCategoryLocation].eoDescription = cfsTransactionDescription;
  }else{
    expenseInputObject.push(new ExpenseObject(cfsSelectedCategory,cfsSelectedAmount,cfsRecurringFlag,cfsTransactionDate,cfsTransactionDescription))
  }
  categoryFieldsetElement.reset();
  summaryPageLink();
}

function retrieveUserFormDefault(){
  //run = retrieveUserName
  var runUserNameElement = document.getElementById('user-name-input-id');
  var runUserIncomeAmount = document.getElementById('user-income-input-id')
  var runHousingBudgetElement = document.getElementById('user-housing-budget-input-id');
  var runFoodBudgetElement = document.getElementById('user-food-budget-input-id');
  var runUtilityBudgetElement = document.getElementById('user-utilities-budget-input-id');
  var runLoanBudgetElement = document.getElementById('user-loans-budget-input-id');
  var runMiscBudgetElement = document.getElementById('user-misc-budget-input-id');

  if(localStorage.length){
    runUserNameElement.value = retrieveUserNameFromLS();
  }else{
    runUserNameElement.value = '<Please Enter Name>';
    runUserIncomeAmount.value = '0';
    runHousingBudgetElement.value = '0';
    runFoodBudgetElement.value = '0';
    runUtilityBudgetElement.value = '0';
    runLoanBudgetElement.value = '0';
    runMiscBudgetElement.value = '0';
  }
}

bijCategoryObjectArray = defaultCategoryCreator();
categoryRender();
userFieldsetElement.addEventListener('submit', userFormSubmitHandler);
categoryFieldsetElement.addEventListener('submit', categoryFormSubmitHandler);
retrieveUserFormDefault();
