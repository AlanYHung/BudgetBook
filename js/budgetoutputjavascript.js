'use strict';

var summaryIncomeObjectArray = [];
var summaryExpenseObjectArray = [];
var summaryCategoryObjectArray = [];

// chart label + data arrays
var chartCategoryLabels = [];
var chartCategorySpentData = [];
var chartCategoryTotalData = [];

// array of income entries
var chartIncomeItemsArray = [];

var chartIncomeTotalData = '';
var chartSpentTotalData = '';
var categoryTotalofTotals = '';

// income parameters: category, amount, frequency, startingdate
// io = incomeObject
// ffi = income form field input

function SummaryIncomeObject(ffiCategory, ffiAmount) {
  this.ioCategory = ffiCategory;
  this.ioAmount = ffiAmount;

  summaryIncomeObjectArray.push(this);
}

// eo = expenseObject
// ffe = expense form field input

function SummaryExpenseObject(ffeCategory, ffeAmount, ffeRecurring, ffeTransactionDate, ffeDescription = '') {
  this.eoCategory = ffeCategory;
  this.eoAmount = ffeAmount;
  this.eoRecurring = ffeRecurring; // boolean 
  this.eoTransactionDate = ffeTransactionDate;
  this.eoDescription = ffeDescription;

  summaryExpenseObjectArray.push(this);
}

// ffc = form field category
// DIFFERENT from app.js CategoryObject Creator, the 0 erases data pulled from LS
function SummaryCategoryObject(ffcName, ffcBudget) {
  this.categoryName = ffcName;
  this.categoryBudget = ffcBudget;

  summaryCategoryObjectArray.push(this);
}

function retrieveObjectsFromLS() {
  var incomeObjectsFromLS = localStorage.getItem('lsIncomeObject');
  var expenseObjectsFromLS = localStorage.getItem('lsExpenseObject');
  var categoryObjectsFromLS = localStorage.getItem('lsCategoryObject');

  var parsedIncomeObjectArray = JSON.parse(incomeObjectsFromLS);
  var parsedExpenseObjectArray = JSON.parse(expenseObjectsFromLS);
  var parsedCategoryObjectArray = JSON.parse(categoryObjectsFromLS);

  generateNewObjectArrays(parsedIncomeObjectArray, parsedExpenseObjectArray, parsedCategoryObjectArray);
}

function generateNewObjectArrays(income, expense, category) {
  var lsIncomeObject = new SummaryIncomeObject(income.ioCategory, income.ioAmount);

  for (var expenseCounter = 0; expenseCounter < expense.length; expenseCounter++) {
    new SummaryExpenseObject(expense[expenseCounter].eoCategory, expense[expenseCounter].eoAmount, expense[expenseCounter].eoRecurring, expense[expenseCounter].eoTransactionDate, expense[expenseCounter].eoDescription);
  }

  for (var categoryCounter = 0; categoryCounter < category.length; categoryCounter++) {
    new SummaryCategoryObject(category[categoryCounter].categoryName, category[categoryCounter].categoryBudget,);
  }
}


// array totaler adapted from: https://codeburst.io/javascript-arrays-finding-the-minimum-maximum-sum-average-values-f02f1b0ce332
function ArrayTotaler(array) {
  return array.reduce(function (a, b) {
    return (a + b)
  }, 0);
}

// generates array of income entries
function incomeArrayCreator() {
  for (var i = 0; i < summaryIncomeObjectArray.length; i++) {
    chartIncomeItemsArray.push(parseInt(summaryIncomeObjectArray[i].ioAmount));
  }
}

// generates category labels array
function chartLabelsCreator() {
  for (var i = 0; i < summaryCategoryObjectArray.length; i++) {
    chartCategoryLabels.push(summaryCategoryObjectArray[i].categoryName);
  }
}

// generates spent-so-far data array **** As currently written, budget items must be entered in the exact same order as 
function chartCategorySpentCreator() {
  for (var i = 0; i < summaryExpenseObjectArray.length; i++) {
    chartCategorySpentData.push(parseInt(summaryExpenseObjectArray[i].eoAmount));
  }
}

// generates category total data array
function chartCategoryDataTotaler() {
  for (var i = 0; i < summaryCategoryObjectArray.length; i++) {
    chartCategoryTotalData.push(parseInt(summaryCategoryObjectArray[i].categoryBudget));
  }
}

// alert if budget entered is larger than total income
function budgetOverIncomeAlert() {
  if (chartIncomeTotalData < categoryTotalofTotals) {
    alert('Warning! Your total budget is higher than the income entered. Please consider returning to the form page to make adjustments.');
  } else {
    return;
  }
}

// takes arrays and generates the total, plus totals of the totals
function arraysTotaler() {
  chartIncomeTotalData = ArrayTotaler(chartIncomeItemsArray);
  chartSpentTotalData = ArrayTotaler(chartCategorySpentData);
  categoryTotalofTotals = ArrayTotaler(chartCategoryTotalData);

  chartCategoryLabels.push('Total');
  chartCategorySpentData.push(chartSpentTotalData);
  chartCategoryTotalData.push(categoryTotalofTotals);

  return (chartIncomeTotalData, chartSpentTotalData, categoryTotalofTotals);
}


function drawBarGraph() {
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

retrieveObjectsFromLS();
incomeArrayCreator();
chartLabelsCreator();
chartCategorySpentCreator();
chartCategoryDataTotaler();
arraysTotaler();
budgetOverIncomeAlert();
drawBarGraph();
