
const firstName = document.querySelector("#name");
const firstNameError = document.querySelector("#name-error");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");
const message = document.querySelector("#message");
const messageError = document.querySelector("#message-error");


function validateForm() {

    event.preventDefault();

    if (validateLength(firstName.value, 0)) {
        firstNameError.style.display = "none";
    }
    else {
        firstNameError.style.display = "block";
    }

    if (validateEmail(email.value) === true) {
        emailError.style.display = "none";
    }
    else {
        emailError.style.display = "block";
    }

    if (validateLength(subject.value, 0)) {
        subjectError.style.display = "none";
    }
    else {
        subjectError.style.display = "block";
    }

    if (validateLength(message.value, 10)) {
        messageError.style.display = "none";
    }
    else {
        messageError.style.display = "block";
    }
}

function validateLength(value, number) {
    if(value.trim().length > number) {
        return true
    }
    else {
        return false
    }
}

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const emailValid = regEx.test(email);
    return emailValid;
}
