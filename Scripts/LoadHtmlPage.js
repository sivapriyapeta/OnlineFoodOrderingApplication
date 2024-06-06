function LoginOrResiterForm(ele){
    var loginForm = document.getElementById("pills-home");
    var registerForm = document.getElementById("pills-profile");
    if(ele.id == "pills-home-tab"){
        // registerForm.classList.remove("active");
        // loginForm.classList.add("show");
        // loginForm.classList.add("active");
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    }
    else if(ele.id == "pills-profile-tab"){
        // loginForm.classList.remove("show");
        // loginForm.classList.remove("active");
        registerForm.classList.add("show");
        registerForm.classList.add("active");
        registerForm.style.display = "block";
        loginForm.style.display = "none";
        
    }
}

// function loginFormValidation(){
//     var emailId = document.getElementById("email");
//     var password = document.getElementById("password");
//     var emailRegExPattern = /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\. [a-zA-Z]{2,}$/;
//     if(emailId == "" || emailRegExPattern.test(emailId)){
//         const para = document.createElement("p");
//         const paraText = document.createTextNode("Email Entered is invalid! Please verify")
//         para.appendChild(paraText)
//         para.style.color = "#F76F2A";
//     }
// }
function loginFormValidation(x){
    if(x.id == "email"){
        ValidateEmail(x.id);
    }
    else if(x.id == "password"){
        ValidatePassword(x.id);
    }
}

function ValidateEmail(elementId){
    var emailId = document.getElementById(elementId);
    var emailRegExPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailRegExPattern.test(emailId.value) || emailId.value === ""){
        emailId.classList.add("inValid");
        emailId.classList.remove("valid");
        emailId.insertAdjacentHTML("afterend", `<span id="emailIdValidationMessage">Invalid Email!</span>`);
    }
    else{
        emailId.classList.remove("inValid");
        emailId.classList.add("valid");
        document.getElementById("emailIdValidationMessage").style.display = "none";
    }
}

function ValidatePassword(elementId){
    var password = document.getElementById(elementId);
    if(password.value.length <= 8 || password.value === ""){
        password.classList.add("inValid");
        password.classList.remove("valid");
        password.insertAdjacentHTML("afterend", `<span id="passwordValidationMessage" style="display: none;">Invalid Password!</span>`);
        document.getElementById("passwordValidationMessage").style.display = "block";
    }
    else{
        password.classList.remove("inValid");
        password.classList.add("valid");
        document.getElementById("passwordValidationMessage").style.display = "none";
    }
}