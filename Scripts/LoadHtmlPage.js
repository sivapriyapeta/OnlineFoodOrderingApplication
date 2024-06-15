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

// document.addEventListener('DOMContentLoaded', () => {
//     const addCartToButtons = document.querySelectorAll('.add-to-cart');
//     const cartItemCount = document.querySelector('.cart-icon span');
//     const cartItemsList = document.querySelector('.cart-tems');
//     const cartTotal = document.querySelector('.cart-total');
//     const cartIcon = document.querySelector('.cart-icon');
//     const sideBar = document.getElementById('sidebar');

//     let cartItems = [];
//     let totalAmount = 0;
//     addCartToButtons.forEach((button, index) => {
//         button.addEventListener('click', () =>{
//             const item = {
//                 name: document.querySelectorAll('.card .card-title')[index].textContent,
//                 price: parseFloat(document.querySelectorAll('.price')[index].textContent.slice(1),
//             ),
//             quantity:1,
//             };
//             const existingItem = cartItems.find(
//                 (cartItem) => cartItem.name === item.name,
//             );
//             if(existingItem){
//                 existingItem.quantity++;
//             }
//             else{
//                 cartItems.push(item);
//             }

//             totalAmount +=item.price;
//             UpdateCartUI();
//         });

//         function UpdateCartUI(){
//             updateCartItemCount(cartItems.length);
//             updateCartItemList();
//             updateCartTotal();
//         }

//         function updateCartItemCount(count){
//             cartItemCount.textContent = count;
//         }

//         function updateCartItemList(){
//             cartItemsList.innerHTML = '';
//             cartItems.forEach((item, index) => {
//                 const cartItem = document.createElement('div');
//                 cartItem.classList.add('cart-item', 'individual-cart-item');
//                 cartItem.innerHTML=`
//                 <span>(${item.quantity}x)${item.name}</span>
//                 <span class="cart-item-price">${(item.price * item.quantity).toFixed(2)}
//                 <button class="remove-btn" data-index="${index}"><i class="fa fa-times" aria-hidden="true"></i></button>
//                 </span>
//                 `;

//                 cartItemsList.append(cartItem);
//             });
//             const removeButtons = document.querySelectorAll('remove-item');
//             removeButtons.forEach((button) => {
//                 button.addEventListener('click', (event) => {
//                     const index = event.target.dataset.index;
//                     removeItemFromCart(index);
//                 });
//             });
//         }
//         function removeItemFromCart(index){
//             const removeItem = cartItems.splice(index, 1)[0];
//             totalAmount -= removeItem.price * removeItem.quantity;
//             UpdateCartUI();
//         }

//         function UpdateCartTotal(){
//             cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
//         }

//         cartIcon.addEventListener('click', () => {
//             sideBar.classList.toggle('open');
//         });

//         const closeButton = document.querySelector('sidebar-close');
//         closeButton.addEventListener('click', () =>{
//             sideBar.classList.remove('open');
//         });
//     });
// });
