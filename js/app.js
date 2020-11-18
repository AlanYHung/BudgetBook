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

