'use strict';

// Stores new user name into cookie or retrieves user name from cookie for personal greeting.
function userGreetingFromLS(){
  //ugfc = userGreetingFromCookie shows variables belong to this function
  var ugfcHeaderElement = document.getElementById('home-page-greeting');
  
  // Checks if there is a user stored in cookies and if not will prompt for new user name  
  if(!localStorage.length){
    ugfcHeaderElement.textContent = `Welcome New User!!`;
  }else{    
    var userNameFromLS = retrieveUserNameFromLS();
    ugfcHeaderElement.textContent = `Welcome Back ${userNameFromLS}!!`;
    // This section allows the Summary Page link on the homepage to appear/disappear based on user's cookie status; Summary Page link will appear if the user is a return customer (e.g. has cookie)
    summaryPageLink("homepage-summary-link");
    // elementCreator('homepage-summary-link', 'a', 'Summary Page', 'href', './budgetoutput.html')    
  }
}

userGreetingFromLS();