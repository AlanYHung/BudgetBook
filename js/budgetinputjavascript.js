'use strict';

var bijCategoryObjectArray = [];
var userFieldsetElement = document.getElementById('submit-button-id');
var categoryFieldsetElement = document.getElementById('category-form-submit-id');

function categoryRender() {
    for (var i = 0; i < bijCategoryObjectArray.length; i++) {
        elementCreator('category-selection-options-id', 'option', bijCategoryObjectArray[i].categoryName, 'value', `category-${bijCategoryObjectArray[i].categoryName}`);
    }

}

function userFormSubmitHandler (e) {
    e.preventDefault();
    console.log('hello1');
}

function categoryFormSubmitHandler (e) {
    e.preventDefault();
    console.log('hello2');
}

bijCategoryObjectArray = defaultCategoryCreator();

categoryRender();

userFieldsetElement.addEventListener('click', userFormSubmitHandler);

categoryFieldsetElement.addEventListener('click', categoryFormSubmitHandler);
