

# Budget Book 

## Summary of Idea:  
A budget generator. There are plenty of great tools out there, but I still always find it easiest to track my own budget by manually calculating "benchmarks" for every 5th day of the month. That way, at any given day you can look at your total spent for the month so far and know immediately whether you're over or under budget.

## Problem Pain Point
The primary pain point is the difficulty of seeing your budget "at a glance." The app would make it possible to see on any given day instantly whether you are over or under budget and by how much. It would also by dynamic and can change as expenses/income change.

## Scope
### IN
* Graphs
* Customizable Categories
* Budget snapshot
* Simple Navigation

### OUT
* Cumulative and line-item entries won't be allowed in a single category (either/or)
* Logins
* Data encryption or databases
* No multi-user per machine

## Product Description
Budget Book isn't your stale old budgeting app. It's designed to keep you interested in your budget, so you'll keep coming back to stay on track. It provides a new refreshing and fun twist to managing your budget.  Not only will we provide you the ability to track and change your budget throughout the month, but it will be done with some flair with animations and graphs.

## MVP
The MVP would be a form that can intake income amounts, expense amounts(and their dates), savings goals and return a daily-calculations for an on-track budget that can be compared against the actual spending so-far-this-month.

## Stretch Goals
* Reactive avatar that will level or de-level based on how well user follows their budget
* End of Month Summary Report that will analytically show how well you did in each category and as a whole
* CSS Page flips
* Track budget expenses month over month, and use averages to set future monthly budgets
* 

## Functional Requirements
* A user account is created and saved by entering a username (no login/password)
* User can add/delete budget categories, up to 10 total
* User can create a budget by entering budget line items or cumulative spending
* User can view a automatically generated chart of their budget, with categories
* User can stay interested and engaged because of the app's intersting interface and design

## Data Flow
The user will arrive on the home page and be welcomed.  If new user they will be directed to the form entry page.  All other Navigation items will be hidden.  If returning user, we will check their cookie for information.  If cookie is missing then they will be directed to form entry page.  Otherwise they will be allowed to go directly to Summary page.  For a new user, the experience will start on Home Page.  Next the user will go to the Form page to enter in their Income/Budget/Expenses.  Finally the user will be allowed to visit the summary page which will graphically represent  their current budget situation and let them know of remaining budget by category or flag if they are overbudget.