const submitButton = document.getElementById("submitButton");
const paragraphs = document.querySelectorAll('p');
const textFields = document.querySelectorAll('input');
const successAlert = document.getElementById('successAlert');
const radioButtons = document.getElementsByName('query');
const queryButton = document.getElementById('queryGeneral');
const suppButton = document.getElementById('querySupp');
const generalEnquiry = document.getElementById('generalEnquiry');
const supportRequest = document.getElementById('supportRequest');



submitButton.onclick = () => {
    event.preventDefault();
    valid = validForm();
    if(valid === true){
        successAlert.style.display = 'flex';
    }
    else{
        successAlert.style.display = 'none';
    }
}

queryButton.addEventListener("change", () => {
    event.preventDefault();
    if (queryButton.checked) {
      generalEnquiry.style.backgroundColor = 'var(--greenLighter)';
      supportRequest.style.backgroundColor = 'white';
    }
  });

suppButton.addEventListener("change", () => {
    event.preventDefault();
    console.log("here");
    if (suppButton.checked) {
        generalEnquiry.style.backgroundColor = 'white';
        supportRequest.style.backgroundColor = 'var(--greenLighter)';
    }
  });


//Checks if any arbitrary field is empty and changes them to a fail state if they are.
function emptyCheck(valid, fieldName, warningName) {
    const field = document.getElementById(fieldName);
    const warning = document.getElementById(warningName);
    if(field.value == "") {
        valid = false;
        warning.style.display = 'block';
        field.style.borderColor = 'red';
    }
    else{
        field.style.borderColor = 'var(--greyMedium)';
        warning.style.display = 'none';
    }

    return valid;
}

function unchecked(valid, fieldName, warningName){
    const checkbox = document.getElementById(fieldName);
    const warning = document.getElementById(warningName);
    if(checkbox.checked){
        warning.style.display = 'none';
    }
    else{
        warning.style.display = 'block';
        valid = false;
    }
    return valid;
}

function radioCheck(valid, groupName, warningName) {
    const radioButtons = document.getElementsByName(groupName);
    const warning = document.getElementById(warningName);
    const warning0 = document.getElementById('queryWarningMobile'); 
    for(i = 0; i < radioButtons.length; i++){
        if(radioButtons[i].checked){
            warning.style.display = 'none';
            warning0.style.display = 'none';
            valid = true;
            break;
        }
        else {
            valid = false;
            warning.style.display = 'block';
            warning0.style.display = 'block'
            warning0.style.color = 'white';
        }
    }
    return valid;
}

function radioCheckMobile(valid, groupName, warningName) {
    const radioButtons = document.getElementsByName(groupName);
    const warning = document.getElementById(warningName);
    const warning0 = document.getElementById('queryWarningDesk'); 
    for(i = 0; i < radioButtons.length; i++){
        if(radioButtons[i].checked){
            warning.style.display = 'none';
            warning0.style.display = 'none';
            valid = true;
            break;
        }
        else {
            valid = false;
            warning.style.display = 'block';
            warning0.style.display = 'none';
        }
    }
    return valid;
}

function emailCheck(valid, fieldName, warningName){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const field = document.getElementById(fieldName);
    const warning = document.getElementById(warningName);
    if(re.test(field.value)){
        valid = true;
        warning.style.display = 'none';
        field.style.borderColor = 'var(--greyMedium)';
    }
    else{
        valid = false;
        warning.style.display = 'block';
        field.style.borderColor = 'red';
    }
    return valid;
}

function validForm() {
    let valid = true;
    if (window.matchMedia("(max-width: 689px)").matches) {
        valid = radioCheckMobile(valid, 'queryGroup', 'queryWarningMobile');
    }

    else {
        valid = radioCheck(valid, 'queryGroup', 'queryWarningDesk');
    }
    valid = emptyCheck(valid, 'fname', 'fnameWarning');
    valid = emptyCheck(valid, 'lname', 'lnameWarning');
    valid = emptyCheck(valid, 'message', 'messageWarning');
    valid = unchecked(valid, 'consent', 'consentWarning');
    valid = emailCheck(valid, 'email', 'emailWarning');
    
    return valid;
}