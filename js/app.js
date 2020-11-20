'use strict';

var incomeObjectArray = [];
var expenseObjectArray = [];
var categoryObjectArray = [];
var initialExpenseInputObject = retrieveExpenseArrayFromLS();


// This function is a generic function that allows creation of element anywhere in the web app; where the child content is optional
function elementCreator(ecParentId,   ecChildElement, ecChildContent = '', ecAttributeType1 = '', ecAttributeContent1 = '', ecAttributeType2 = '', ecAttributeContent2 = ''){
// ec = Element Creator
  var ecParentElement = document.getElementById(ecParentId);
  var ecChildElement = document.createElement(ecChildElement);
  
  if (ecChildContent){
    ecChildElement.textContent = ecChildContent;
  }  

  if (ecAttributeType1){
    ecChildElement.setAttribute(ecAttributeType1, ecAttributeContent1);
  }
  
  if (ecAttributeType2){
    ecChildElement.setAttribute(ecAttributeType2, ecAttributeContent2);
  }

  ecParentElement.appendChild(ecChildElement);
}


// income parameters: category, amount, frequency, startingdate
// io = incomeObject
// ffi = income form field input

function IncomeObject (ffiCategory, ffiAmount) {
    this.ioCategory = ffiCategory;
    this.ioAmount = ffiAmount;

    incomeObjectArray.push(this);
}

// eo = expenseObject
// ffe = expense form field input

function ExpenseObject (ffeCategory, ffeAmount, ffeRecurring, ffeTransactionDate, ffeDescription = '') {
    this.eoCategory = ffeCategory;
    this.eoAmount = ffeAmount;
    this.eoRecurring = ffeRecurring; // boolean 
    this.eoTransactionDate = ffeTransactionDate;
    this.eoDescription = ffeDescription;

    expenseObjectArray.push(this);
}

// ffc = form field category
function CategoryObject (ffcName) {
    this.categoryName = ffcName;
    this.categoryBudget = 0;

    categoryObjectArray.push(this);
}

function defaultCategoryCreator() {
    new CategoryObject ('Housing');
    new CategoryObject ('Food');
    new CategoryObject ('Utilities');
    new CategoryObject ('Loans');
    new CategoryObject ('Miscellaneous');

    return categoryObjectArray;
}


// These local storage functions created by Sang
function storeObjectsIntoLS(formExpenseObjectArray = '', formUserName = '', formIncomeObjectArray = '', formCategoryObjectArray = ''){
  //ls = Local Storage
  //modified by AYH to fit needs of Form Page
  //added optional parameters and split the income and expense form inputs
  if(formUserName){
    var stringifiedUserName = JSON.stringify(formUserName);
    var stringifiedIncomeObjects = JSON.stringify(formIncomeObjectArray);
    var stringifiedCategoryObjects = JSON.stringify(formCategoryObjectArray);

    localStorage.setItem('lsUserName', stringifiedUserName);
    localStorage.setItem('lsIncomeObject', stringifiedIncomeObjects);
    localStorage.setItem('lsCategoryObject', stringifiedCategoryObjects);
  }

  if(formExpenseObjectArray){
    var stringifiedExpenseObjects = JSON.stringify(formExpenseObjectArray);
    localStorage.setItem('lsExpenseObject', stringifiedExpenseObjects);
  }
}

function retrieveObjectsFromLS(){
  var incomeObjectsFromLS = localStorage.getItem('income');
  var expenseObjectsFromLS = localStorage.getItem('expense');
  var categoryObjectsFromLS = localStorage.getItem('category');

  var parsedIncomeObjectArray = JSON.parse(incomeObjectsFromLS);
  var parsedExpenseObjectArray = JSON.parse(expenseObjectsFromLS);
  var parsedCategoryObjectArray = JSON.parse(categoryObjectsFromLS);

  generateNewObjectArrays(parsedIncomeObjectArray, parsedExpenseObjectArray, parsedCategoryObjectArray);
}

function generateNewObjectArrays(income, expense, category){
  incomeObjectArray = [];
  expenseObjectArray = [];
  categoryObjectArray = [];

  for (var incomeCounter=0; incomeCounter < income.length; incomeCounter++){
    new IncomeObject(income[incomeCounter].ioCategory, income[incomeCounter].ioAmount);
  }

  for (var expenseCounter=0; expenseCounter < expense.length; expenseCounter++){
    new ExpenseObject(expense[expenseCounter].eoAmount, expense[expenseCounter].eoRecurring, expense[expenseCounter].eoTransactionDate, expense[expenseCounter].eoDescription, expense[expenseCounter].eoBudget);
  }

  for (var categoryCounter=0; categoryCounter < category.length; categoryCounter++) {
    new CategoryObject(category[categoryCounter].categoryName, category[categoryCounter].categoryType, category[categoryCounter].categoryPaymentTrackingStyle);
  }

}

//Additional LS Functions AYH
function retrieveUserNameFromLS(){
  var userNameFromLS = localStorage.getItem('lsUserName');

  return JSON.parse(userNameFromLS);
}

function retrieveIncomeAmountFromLS(){
  var incomeAmountFromLS = localStorage.getItem('lsIncomeObject');
  var parsedIncomeAmountFromLS = JSON.parse(incomeAmountFromLS);

  return parsedIncomeAmountFromLS.ioAmount;
}

function retrieveBudgetArrayFromLS(){
  var budgetArrayFromLS = localStorage.getItem('lsCategoryObject');
  var parsedBudgetArrayFromLS = JSON.parse(budgetArrayFromLS);

  return parsedBudgetArrayFromLS;
}

function retrieveExpenseArrayFromLS(){
  var expenseArrayFromLS = localStorage.getItem('lsExpenseObject');
  var parsedExpenseArrayFromLS = JSON.parse(expenseArrayFromLS);

  return parsedExpenseArrayFromLS;
}

// Function makes summary page link available only when it's a repeat user who has submitted valid income and expense data. 
function summaryPageLink(splLinkElementId) {  
  //spl = summaryPageLink
  var splLinkElement = document.getElementById(splLinkElementId).textContent;

  if(localStorage.length){
    //Reference to solve whether Array exists: https://stackoverflow.com/questions/24403732/how-to-check-if-array-is-empty-or-does-not-exist
    if (retrieveIncomeAmountFromLS() > 0 && Array.isArray(initialExpenseInputObject) && initialExpenseInputObject.length > 0) {
      if (!splLinkElement) {      
        elementCreator(splLinkElementId, 'a', 'Summary Page', 'href', './budgetoutput.html');
      } else {
        // do nothing
      }
    }
  }
}
