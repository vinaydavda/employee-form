// Script runs after Page loaded successfully.
window.addEventListener('load', function () {

    // Make message place hidden
    document.getElementById('messagebox').style.display = "none";

    // Make field default hidden
    var spouse_tr = document.getElementById("spouse_tr");
    spouse_tr.style.display = "none";

    var radios = document.querySelectorAll('input[type=radio][name="marital_status"]');
    radios.forEach(radio => radio.addEventListener('change', () => spouse_field_controller(radio.value)));

    function spouse_field_controller(status) {
        if (status === 'married') {
            spouse_tr.style.display = "";
        } else {
            spouse_tr.style.display = "none";
        }
    };
});



// Validations
function emptyValidation(data) {
    if (data === '') {
        return false
    }
    return true
}

// Radio button Validations
function radioValidation(data) {
    try {
        data.value;
    } catch (err) {
        return false
    }
    return true
}



// Display message function
function displayMessage(text, color) {
    // Message Field
    let msgbox = document.getElementById('messagebox');
    // Message span
    let msgSpan = document.createElement('span');
    msgSpan.textContent = text;
    msgSpan.style.color = color;
    msgbox.innerHTML = '';
    msgbox.appendChild(msgSpan);
    msgbox.style = '';
}



// A function for name validation with regex. First and Last name shoud be start with Capital followed by 1 or more a-z lowers
function validateName(name) {
    let regex = /[A-Z][a-z]{1,}/;
    let result = regex.exec(name);
    if (result === null) {
        return false
    } else if (result[0].length === name.length) {
        return true;
    } else {
        return false;
    }
}



// Clear Form
function resetForm() {
    let fname = document.getElementById('first_name');
    fname.value = '';
    fname.focus();
    document.getElementById('last_name').value = '';

    document.getElementById('male').checked = false;
    document.getElementById('female').checked = false;
    document.getElementById('married').checked = false;
    document.getElementById('unmarried').checked = false;

    document.getElementById('spouse_name').value = '';
    document.getElementById('other_details').value = '';

    document.getElementById('spouse_tr').style.display = "none";
    document.getElementById('messagebox').style.display = "none";
}



// After Submitting Data - Click on SAVE button

function validation() {

    // Getting Form Fields
    let fname = document.getElementById('first_name');
    let lname = document.getElementById('last_name');
    let gender = document.querySelector('input[name="gender"]:checked');
    let mstatus = document.querySelector('input[name="marital_status"]:checked');
    let sname = document.getElementById('spouse_name');
    let odetails = document.getElementById('other_details');

    // a flag to check whether run next if validation  (in case other validations are success) or not.
    // beacuse we are checking true and false conditions saperately in if-else statements separately.
    let flag = false;

    // First Name Validation
    if (emptyValidation(fname.value) === false) {
        fname.focus();
        fname.style.outlineColor = 'red';
        displayMessage('> Please enter a Firstname', 'red');

    } else {
        if (validateName(fname.value) === false) {
            fname.focus();
            fname.style.outlineColor = 'red';
            displayMessage('> Please enter First Name Properly', 'red');
        } else {
            flag = true;
            console.log("Firstname is OK");
        }
    }

    // Last Name Validation
    if (flag === true) {
        flag = false;
        if (emptyValidation(lname.value) === false) {
            lname.focus();
            lname.style.outlineColor = 'red';
            displayMessage('> Please enter a Lastname', 'red');
        } else {
            if (validateName(lname.value) === false) {
                lname.focus();
                lname.style.outlineColor = 'red';
                displayMessage('> Please enter Last Name Properly', 'red');
            } else {
                flag = true;
                console.log("Lastname is OK");
            }
        }
    }

    if (flag === true) {
        flag = false;
        if (radioValidation(gender) === false) {
            displayMessage('> Please select a Gender', 'red');
        } else {
            flag = true;
            console.log("Gender is OK");
        }
    }

    if (flag === true) {
        flag = false;
        if (radioValidation(mstatus) === false) {
            displayMessage('> Please select Marital Status', 'red');
        } else {
            flag = true;
            console.log("Marital Status is OK");
        }
    }

    if (flag === true && mstatus.value === 'married') {
        flag = false;
        if (emptyValidation(sname.value) === false) {
            sname.focus();
            sname.style.outlineColor = 'red';
            displayMessage('> Please enter Spouse name', 'red');
        } else {
            if (validateName(sname.value) === false) {
                sname.focus();
                sname.style.outlineColor = 'red';
                displayMessage('> Please enter Spouse Name Properly', 'red');
            } else {
                flag = true;
                console.log("Spouse Name is OK");
            }
        }
    }

    if (flag === true) {
        flag = false;
        if (emptyValidation(odetails.value) === false) {
            displayMessage('> Please enter Other details', 'red');
        } else {
            displayMessage('> Thank You !', 'green');
            console.log('Other details are OK');
        }
    }
};