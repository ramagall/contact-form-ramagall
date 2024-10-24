const submitButton = document.getElementById("submitButton");
const successAlert = document.getElementById('successAlert');
const queryButton = document.getElementById('queryGeneral')
const suppButton = document.getElementById('querySupp')
const generalEnquiry = document.getElementById('generalEnquiry');
const supportRequest = document.getElementById('supportRequest');


function emptyField(fieldName) {
    const field = document.getElementById(fieldName);
    field.value = "";
}

function emptyCheckField(fieldName) {
    const field = document.getElementById(fieldName);
    field.checked = false;
}

function emptyRadio(groupName) {
    const radioButtons = document.getElementsByName(groupName);
    for(i = 0; i < radioButtons.length; i++){
        if(radioButtons[i].checked){
            radioButtons[i].checked = false;
        }
    }
    generalEnquiry.style.backgroundColor = 'white';
    supportRequest.style.backgroundColor = 'white';
}

function clearAllFields(){
    emptyField('fname');
    emptyField('lname');
    emptyField('email');
    emptyField('message');
    emptyCheckField('consent');
    emptyRadio('queryGroup');
}

submitButton.onclick = (event, ) => {
    event.preventDefault();
    valid = validForm();
    if(valid === true){
        successAlert.style.display = 'flex';
        clearAllFields();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    else{
        successAlert.style.display = 'none';
    }
}

queryButton.addEventListener("change", (event, ) => {
    event.preventDefault();
    if (queryButton.checked) {
      generalEnquiry.style.backgroundColor = 'var(--greenLighter)';
      supportRequest.style.backgroundColor = 'white';
    }
  });

suppButton.addEventListener("change", (event, ) => {
    event.preventDefault();
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