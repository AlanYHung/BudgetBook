'use strict';

var incomeObjectArray = [];
var expenseObjectArray = [];
var categoryObjectArray = [];

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

function ExpenseObject (ffeCategory, ffeAmount, ffeRecurring, ffeTransactionDate, ffeBudget, ffeDescription = '') {
    this.eoCategory = ffeCategory;
    this.eoAmount = ffeAmount;
    this.eoRecurring = ffeRecurring; // boolean 
    this.eoTransactionDate = ffeTransactionDate;
    this.eoDescription = ffeDescription;
    this.eoBudget = ffeBudget;

    expenseObjectArray.push(this);
}

// ffc = form field category
function CategoryObject (ffcName, ffcType, ffcTrackingStyle) {
    this.categoryName = ffcName;
    this.categoryType = ffcType; //income vs expense
    this.categoryPaymentTrackingStyle = ffcTrackingStyle; //cumulative or line-item category

    categoryObjectArray.push(this);
}

function defaultCategoryCreator() {
    new CategoryObject ('Housing', 'expense', 'line-item');
    new CategoryObject ('Food', 'expense', 'line-item');
    new CategoryObject ('Utilities', 'expense', 'line-item');
    new CategoryObject ('Loans', 'expense', 'line-item');
    new CategoryObject ('Miscellaneous', 'expense', 'line-item');

    return categoryObjectArray;
}


// This is the local storage functions created by Sang
function storeObjectsIntoLS(){
  var stringifiedIncomeObjects = JSON.stringigy(incomeObjectArray);
  var stringifiedExpenseObjects = JSON.stringify(expenseObjectArray);
  var stringifiedCategoryObjects = JSON.stringify(categoryObjectArray);

  localStorage.setItem('income', stringifiedIncomeObjects);
  localStorage.setItem('expense', stringifiedExpenseObjects);
  localStorage.setItem('category', stringifiedCategoryObjects);
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
    new ExpenseObject(expense[expenseCounter].eoAmount, expense[expenseCounter].eoRecurring, expense[expenseCounter].eoTransactionDate, expense[expenseCounter].eoDescription), expense[expenseCounter].eoBudget);
  }

  for (var categoryCounter=0; categoryCounter < category.length; categoryCounter++) {
    new CategoryObject(category[categoryCounter].categoryName, category[categoryCounter].categoryType, category[categoryCounter].categoryPaymentTrackingStyle);
  }

}

