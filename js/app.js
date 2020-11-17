'use strict';



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

