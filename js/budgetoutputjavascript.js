'use strict';

var incomeObjectArray = [];
var expenseObjectArray = [];
var categoryObjectArray = [];

/* var summaryIncomeObjectArray = [];
var summaryExpenseObjectArray = [];
var summaryCategoryObjectArray = []; */

/* var insertParent = document.getElementById('summary-table'); */


// ////////////////////////////////////////////////////////////////////
// Below section copied from app.js 11/18 at 8:19pm

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


// Above section copied from app.js 11/18 at 8:19pm
// ////////////////////////////////////////////////////////////////////

/* defaultCategoryCreator()
retrieveObjectsFromLS() */

// ////////////////////////////////////////////////////////////////////
// Below section: DUMMY DATA SAMPLES


/* function IncomeObject (ffiCategory, ffiAmount,) {
  this.ioCategory = ffiCategory;
  this.ioAmount = ffiAmount;

  incomeObjectArray.push(this);
}

new IncomeObject ('Income', 5000);
new IncomeObject ('Income', 400); */



// eo = expenseObject
// ffe = expense form field input


/* function ExpenseObject (ffeCategory, ffeAmount, ffeRecurring, ffeTransactionDate, ffeBudget, ffeDescription = '') {
  this.eoCategory = ffeCategory;
  this.eoAmount = ffeAmount;
  this.eoRecurring = ffeRecurring;
  this.eoTransactionDate = ffeTransactionDate;
  this.eoDescription = ffeDescription;
  this.eoBudget = ffeBudget;

  expenseObjectArray.push(this);
} */

/* new ExpenseObject ('Housing', 1500, 'true', '11/01/2020', 1500, '',);
new ExpenseObject ('Food', 900, 'true', '11/03/2020', 1500, '',);
new ExpenseObject ('Utilities', 200, 'true', '11/06/2020', 300, '',);
new ExpenseObject ('Loans', 200, 'true', '11/10/2020', 300, '',);
new ExpenseObject ('Misc', 600, 'true', '11/03/2020', 1509, '',); */

// ffcBudget added manually to replicate pushed data

/* function CategoryObject (ffcName, ffcBudget) {
  this.categoryName = ffcName;
  this.categoryBudget = ffcBudget;

  categoryObjectArray.push(this);
}
 */

// old category constructor
/* function CategoryObject (ffcName, ffcType, ffcTrackingStyle) {
  this.categoryName = ffcName;
  this.categoryType = ffcType; //income vs expense
  this.categoryPaymentTrackingStyle = ffcTrackingStyle; //cumulative or line-item category

  categoryObjectArray.push(this);
} */


/* function defaultCategoryCreator() {
  new CategoryObject ('Housing', 1500);
  new CategoryObject ('Food', 1500);
  new CategoryObject ('Utilities', 300);
  new CategoryObject ('Loans', 300);
  new CategoryObject ('Miscellaneous', 6000);

  return categoryObjectArray;
}

defaultCategoryCreator(); */

/* console.log(incomeObjectArray);
console.log(expenseObjectArray);
console.log(categoryObjectArray); */


// End of dummy data samples, can be deleted after LS functionality completed
// ////////////////////////////////////////////////////////////////////



// array totaler adapted from: https://codeburst.io/javascript-arrays-finding-the-minimum-maximum-sum-average-values-f02f1b0ce332
function ArrayTotaler(array) {
    return array.reduce(function (a, b) {
        return (a + b)
    }, 0);
}


// chart label + data arrays
var chartCategoryLabels = [];
var chartCategorySpentData =[];
var chartCategoryTotalData = [];

// array of income entries
var chartIncomeItemsArray = [];


// generates array of income entries
function incomeArrayCreator() {
  for (var i = 0; i < incomeObjectArray.length; i++) {
    chartIncomeItemsArray.push(incomeObjectArray[i].ioAmount);
  }
}

// generates category labels array
function chartLabelsCreator() {
  for (var i = 0; i < categoryObjectArray.length; i++) {
    chartCategoryLabels.push(categoryObjectArray[i].categoryName);
  }
}


// generates spent-so-far data array **** As currently written, budget items must be entered in the exact same order as 
function chartCategorySpentCreator() {
  for (var i = 0; i < expenseObjectArray.length; i++) {
  chartCategorySpentData.push(expenseObjectArray[i].eoAmount);
  }
}


// generates category total data array
function chartCategoryDataTotaler() {
  for (var i = 0; i < categoryObjectArray.length; i++) {
    chartCategoryTotalData.push(categoryObjectArray[i].categoryBudget);
  }
}

/* chartIncomeTotalData = 1000;
chartCategoryTotalData = 5000; */


function budgetOverIncomeAlert() {
  if (chartIncomeTotalData < chartCategoryTotalData) {
  alert('Warning! Your total budget is higher than the income entered. Please consider returning to the form page to make adjustments.');
  } else {
  return;
}
}

budgetOverIncomeAlert()
incomeArrayCreator();
chartLabelsCreator();
chartCategorySpentCreator();
chartCategoryDataTotaler();

console.log(chartIncomeItemsArray);
console.log(chartCategoryLabels);
console.log(chartCategorySpentData);
console.log(chartCategoryTotalData);

var chartIncomeTotalData = ArrayTotaler(chartIncomeItemsArray);
var chartSpentTotalData = ArrayTotaler(chartCategorySpentData);
var categoryTotalofTotals = ArrayTotaler(chartCategoryTotalData);

console.log(chartIncomeTotalData);
console.log(chartSpentTotalData);
console.log(categoryTotalofTotals);

chartCategoryLabels.push('Total');
chartCategorySpentData.push(chartSpentTotalData);
chartCategoryTotalData.push(categoryTotalofTotals);


function drawBarGraph(){
    var canvasParent = document.getElementById('budget-chart');
    new Chart(canvasParent, {
      type: 'bar',
      data: {
        labels: chartCategoryLabels,
        datasets: [
          {
            label: 'Spent so far',
            barPercentage: 0.5,
            backgroundColor: 'Green',
            data: chartCategorySpentData
          },
          {
            label: 'Total Budgeted for the Month',
            barPercentage: 0.5,
            backgroundColor: 'Black',
            data: chartCategoryTotalData
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Budget Progress So Far This Month',
          fontSize: 20
        },
        scales: {
          xAxes: [{
            stacked: false,
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
            }
          }],
          yAxes: [{
            stacked: false,
          }]
        }
      },
    });
  
    canvasParent.style.width = '1460px';
  }

drawBarGraph();



// if total of 