'use strict';

var bijCategoryObjectArray = [];
var expenseInputObject = [];
var incomeInputObject;
var userFieldsetElement = document.getElementById('user-form');
var categoryFieldsetElement = document.getElementById('category-form');

// Adds Categories to the Select Drop Down
function categoryRender() {
  for (var i = 0; i < bijCategoryObjectArray.length; i++) {
    elementCreator('category-selection-options-id', 'option', bijCategoryObjectArray[i].categoryName, 'value', `${bijCategoryObjectArray[i].categoryName}`);
  }
}


function userFormSubmitHandler(ufsEvent) {
  ufsEvent.preventDefault();
  var ufsUserNameInput = ufsEvent.target.userNameInput.value
  var ufsUserIncomeInput = ufsEvent.target.userIncomeInput.value;
  var ufsHousingBudgetInput = ufsEvent.target.userHousingBudgetInput.value;
  var ufsFoodBudgetInput = ufsEvent.target.userFoodBudgetInput.value;
  var ufsUtilitiesBudgetInput = ufsEvent.target.userUtilitiesBudgetInput.value;
  var ufsLoansBudgetInput = ufsEvent.target.userLoansBudgetInput.value;
  var ufsMiscBudgetInput = ufsEvent.target.userMiscBudgetInput.value;
  var ufsIndex = 0;

  if (isNaN(ufsUserIncomeInput)){
    alert('Please enter a valid number for all income and budget fields');
  } else {
    incomeInputObject = new IncomeObject('Income', ufsUserIncomeInput);

    for (ufsIndex = 0; ufsIndex < bijCategoryObjectArray.length; ufsIndex++) {
      switch (String(bijCategoryObjectArray[ufsIndex].categoryName)) {
        case 'Housing':
          bijCategoryObjectArray[ufsIndex].categoryBudget = ufsHousingBudgetInput;
          break;
        case 'Food':
          bijCategoryObjectArray[ufsIndex].categoryBudget = ufsFoodBudgetInput;
          break;
        case 'Utilities':
          bijCategoryObjectArray[ufsIndex].categoryBudget = ufsUtilitiesBudgetInput;
          break;
        case 'Loans':
          bijCategoryObjectArray[ufsIndex].categoryBudget = ufsLoansBudgetInput;
          break;
        case 'Miscellaneous':
          bijCategoryObjectArray[ufsIndex].categoryBudget = ufsMiscBudgetInput;
          break;
        default:
        //Do Nothing
      }
    }

    userFieldsetElement.reset();
    storeObjectsIntoLS(false, ufsUserNameInput, incomeInputObject, bijCategoryObjectArray);
    retrieveUserFormDefault();
    summaryPageLink("budgetinput-summary-link");
  }
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
  
  if(localStorage.length){
    expenseInputObject = retrieveExpenseArrayFromLS();
  }

  for (var cfsIndex = 0; cfsIndex < expenseInputObject.length; cfsIndex++) {
    if (expenseInputObject[cfsIndex].eoCategory === cfsSelectedCategory) {
      cfsCategoryExists = true;
      cfsCategoryLocation = cfsIndex;
    }
  }

  if (cfsCategoryExists) {
    expenseInputObject[cfsCategoryLocation].eoCategory = cfsSelectedCategory;
    expenseInputObject[cfsCategoryLocation].eoAmount = cfsSelectedAmount;
    expenseInputObject[cfsCategoryLocation].eoRecurring = cfsRecurringFlag;
    expenseInputObject[cfsCategoryLocation].eoTransactionDate = cfsTransactionDate;
    expenseInputObject[cfsCategoryLocation].eoDescription = cfsTransactionDescription;
  } else {
    expenseInputObject.push(new ExpenseObject(cfsSelectedCategory, cfsSelectedAmount, cfsRecurringFlag, cfsTransactionDate, cfsTransactionDescription))
  }
  storeObjectsIntoLS(expenseInputObject);
  initialExpenseInputObject = expenseInputObject;
  categoryFieldsetElement.reset();
  summaryPageLink("budgetinput-summary-link");
}

function retrieveUserFormDefault() {
  //run = retrieveUserName
  var runUserNameElement = document.getElementById('user-name-input-id');
  var runUserIncomeAmount = document.getElementById('user-income-input-id')
  var runHousingBudgetElement = document.getElementById('user-housing-budget-input-id');
  var runFoodBudgetElement = document.getElementById('user-food-budget-input-id');
  var runUtilityBudgetElement = document.getElementById('user-utilities-budget-input-id');
  var runLoanBudgetElement = document.getElementById('user-loans-budget-input-id');
  var runMiscBudgetElement = document.getElementById('user-misc-budget-input-id');
  var runBudgetObjectArray = [];
  var runIndex = 0;

  if (localStorage.length) {
    runUserNameElement.value = retrieveUserNameFromLS();
    runUserIncomeAmount.value = retrieveIncomeAmountFromLS();
    runBudgetObjectArray = retrieveBudgetArrayFromLS();

    for (runIndex = 0; runIndex < runBudgetObjectArray.length; runIndex++) {
      switch (String(runBudgetObjectArray[runIndex].categoryName)) {
        case 'Housing':
          runHousingBudgetElement.value = runBudgetObjectArray[runIndex].categoryBudget;
          break;
        case 'Food':
          runFoodBudgetElement.value = runBudgetObjectArray[runIndex].categoryBudget;
          break;
        case 'Utilities':
          runUtilityBudgetElement.value = runBudgetObjectArray[runIndex].categoryBudget;
          break;
        case 'Loans':
          runLoanBudgetElement.value = runBudgetObjectArray[runIndex].categoryBudget;
          break;
        case 'Miscellaneous':
          runMiscBudgetElement.value = runBudgetObjectArray[runIndex].categoryBudget;
          break;
        default:
        //Do Nothing
      }
    }
  } else {
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
summaryPageLink("budgetinput-summary-link");
