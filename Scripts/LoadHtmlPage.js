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
        //registerForm.classList.add("active");
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
    var formInputs = document.getElementsByTagName("input");
    if(x.id == "email"){
        ValidateEmail(x.id, formInputs);
    }
    else if(x.id == "password"){
        ValidatePassword(x.id, formInputs);
    }
}

function ValidateEmail(elementId, formInputs){
    var emailId = document.getElementById(elementId);
    var emailRegExPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailRegExPattern.test(emailId.value) || emailId.value === ""){
        emailId.classList.add("inValid");
        emailId.classList.remove("valid");
        emailId.insertAdjacentHTML("afterend", `<span id="emailIdValidationMessage">Invalid Email!</span>`);
        document.getElementById("loginButton").disabled = true;
    }
    else{
        emailId.classList.remove("inValid");
        emailId.classList.add("valid");
        var errorMessage = document.getElementById("emailIdValidationMessage");
        if(errorMessage!=null){
            document.getElementById("emailIdValidationMessage").style.display = "none";
        };
        if(!formInputs.password.classList.contains("inValid") && formInputs.password.value.length > 8 ){
            document.getElementById("loginButton").disabled = false;
        }
    }
}

function ValidatePassword(elementId, formInputs){
    var password = document.getElementById(elementId);
    if(password.value.length <= 8 || password.value === ""){
        password.classList.add("inValid");
        password.classList.remove("valid");
        password.insertAdjacentHTML("afterend", `<span id="passwordValidationMessage" style="display: none;">Invalid Password!</span>`);
        document.getElementById("passwordValidationMessage").style.display = "block";
        document.getElementById("loginButton").disabled = true;
    }
    else{
        password.classList.remove("inValid");
        password.classList.add("valid");
        var errorMessage = document.getElementById("passwordValidationMessage");
        if(errorMessage!=null){
            document.getElementById("passwordValidationMessage").style.display = "none";
        };
        if(!formInputs.email.classList.contains("inValid") && formInputs.email.value.length > 0 ){
            document.getElementById("loginButton").disabled = false;
        }
    }
}

function loginSubmit(){
    var loginName = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var submitButton = document.getElementById("loginButton");
    document.getElementById("loginName").innerHTML = loginName;
    document.getElementById('loginButton').insertAdjacentHTML('afterend', `<span id="successMessage" style="display: none;">Login Successful!</span>`)
    document.getElementById("successMessage").style.display = "block";
}

