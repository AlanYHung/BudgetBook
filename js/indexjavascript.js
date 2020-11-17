'use strict';

// Stores new user name into cookie or retrieves user name from cookie for personal greeting.
function userGreetingFromCookie(){
  //ugfc = userGreetingFromCookie shows variables belong to this function
  var ugfcCookie = document.cookie;
  var ugfcGetCookie;
  var ugfcSplitCookieData;
  var ugfcSplitCookieDataItem;
  var ugfcHeaderElement = document.getElementById('home-page-greeting');
  var userName;

  // Checks if there is a user stored in cookies and if not will prompt for new user name
  if(!ugfcCookie.length){
    do{
      userName = prompt('Welcome New User, what is your name?');
    }while((userName === '') || (userName === undefined) || (userName === null));

    document.cookie = `username = ${userName}`
    ugfcHeaderElement.textContent = `Welcome ${userName}!!`;
  }else{
    ugfcGetCookie = decodeURIComponent(ugfcCookie);
    ugfcSplitCookieData = ugfcGetCookie.split(';');
    ugfcSplitCookieDataItem = ugfcSplitCookieData[0].split('=');
    ugfcHeaderElement.textContent = `Welcome Back ${ugfcSplitCookieDataItem[1]}!!`;
    // This section allows the Summary Page link on the homepage to appear/disappear based on user's cookie status; Summary Page link will appear if the user is a return customer (e.g. has cookie)
    elementCreator('homepage-summary-link', 'a', 'Summary Page', 'href', './budgetoutput.html')    
  }
}

userGreetingFromCookie();