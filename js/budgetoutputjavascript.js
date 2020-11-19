'use strict';

var incomeObjectArray = [];
var expenseObjectArray = [];
var categoryObjectArray = [];

/* var summaryIncomeObjectArray = [];
var summaryExpenseObjectArray = [];
var summaryCategoryObjectArray = []; */

/* var insertParent = document.getElementById('summary-table'); */



// DUMMY DATA SAMPLES
// From here through line 68
function IncomeObject (ffiCategory, ffiAmount,) {
  this.ioCategory = ffiCategory;
  this.ioAmount = ffiAmount;

  incomeObjectArray.push(this);
}

new IncomeObject ('Income', 5000);
new IncomeObject ('Income', 400);

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

new ExpenseObject ('Housing', 1500, 'true', '11/01/2020', 1500, '',);
new ExpenseObject ('Food', 900, 'true', '11/03/2020', 1500, '',);
new ExpenseObject ('Utilities', 200, 'true', '11/06/2020', 300, '',);
new ExpenseObject ('Loans', 200, 'true', '11/10/2020', 300, '',);
new ExpenseObject ('Misc', 600, 'true', '11/03/2020', 1509, '',);


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

defaultCategoryCreator();

// /////////////////////////////
// End of dummy data samples, can be deleted after LS functionality completed
// /////////////////////////////

console.log(incomeObjectArray);
console.log(expenseObjectArray);
console.log(categoryObjectArray);






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
  for (var i = 0; i < expenseObjectArray.length; i++) {
    chartCategoryTotalData.push(expenseObjectArray[i].eoBudget);
  }
}

incomeArrayCreator();
chartLabelsCreator();
chartCategorySpentCreator();
chartCategoryDataTotaler();

console.log(chartIncomeItemsArray);
console.log(chartCategoryLabels);
console.log(chartCategorySpentData);
console.log(chartCategoryTotalData);

var chartIncomeTotalData = ArrayTotaler(chartIncomeItemsArray);
var chartSpentTotalData = ArrayTotaler(chartCategoryTotalData);
var categoryTotalofTotals = ArrayTotaler(chartCategorySpentData);

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
            label: 'Amount Spent',
            barPercentage: 0.5,
            backgroundColor: 'Green',
            data: chartCategorySpentData
          },
          {
            label: 'Amount Budgeted',
            barPercentage: 0.5,
            backgroundColor: 'Black',
            data: chartCategoryTotalData
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'text',
          fontSize: 20
        },
        scales: {
          xAxes: [{
            stacked: true,
            ticks: {
              autoSkip: false,
              maxRotation: 75,
              minRotation: 75
            }
          }],
          yAxes: [{
            stacked: true
          }]
        }
      },
    });
  
    canvasParent.style.width = '1460px';
  }

drawBarGraph();



// if total of 