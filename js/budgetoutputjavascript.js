'use strict';

var summaryIncomeObjectArray = [];
var summaryExpenseObjectArray = [];
var summaryCategoryObjectArray = [];
var insertParent = document.getElementById('summary-table');

// array totaler adapted from: https://codeburst.io/javascript-arrays-finding-the-minimum-maximum-sum-average-values-f02f1b0ce332
function ArrayTotaler(array) {
    return array.reduce(function (a, b) {
        return (a + b)
    }, 0);
}



function drawBarGraph(){
    var canvasParent = document.getElementById('budget-chart');
    new Chart(canvasParent, {
      type: 'bar',
      data: {
        labels: allBussMallProductTitles,
        datasets: [
          {
            label: 'Amount Spent',
            barPercentage: 0.5,
            backgroundColor: 'Green',
            data: allBussMallProductVote
          },
          {
            label: 'Amount Budgeted',
            barPercentage: 0.5,
            backgroundColor: 'Black',
            data: allBussMallProductShown
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: '...',
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



  // income parameters: category, amount, frequency, startingdate
// io = incomeObject
// ffi = income form field input

/* function IncomeObject (ffiCategory, ffiAmount, ffiFrequency, ffiStartingDate) {
    this.ioCategory = ffiCategory;
    this.ioAmount = ffiAmount;
    this.ioFrequency = ffiFrequency;
    this.ioStartingDate = ffiStartingDate;

    incomeObjectArray.push(this);
} */

// eo = expenseObject
// ffe = expense form field input

/* function ExpenseObject (ffeCategory, ffeAmount, ffeRecurring, ffeTransactionDate, ffeDescription = '') {
    this.eoCategory = ffeCategory;
    this.eoAmount = ffeAmount;
    this.eoRecurring = ffeRecurring; // boolean 
    this.eoTransactionDate = ffeTransactionDate;
    this.eoDescription = ffeDescription;

    expenseObjectArray.push(this);
}
 */
// ffc = form field category
/* function CategoryObject (ffcName, ffcType, ffcTrackingStyle) {
    this.categoryName = ffcName;
    this.categoryType = ffcType; //income vs expense
    this.categoryPaymentTrackingStyle = ffcTrackingStyle; //cumulative or line-item category

    categoryObjectArray.push(this);
} */

/* function defaultCategoryCreator() {
    new CategoryObject ('Income', 'income', 'line-item');
    new CategoryObject ('Housing', 'expense', 'line-item');
    new CategoryObject ('Food', 'expense', 'line-item');
    new CategoryObject ('Utilities', 'expense', 'line-item');
    new CategoryObject ('Loans', 'expense', 'line-item');
    new CategoryObject ('Miscellaneous', 'expense', 'line-item');
    new CategoryObject ('Add Category', '', '');
    new CategoryObject ('Remove Category', '', '');

    return categoryObjectArray; */
}