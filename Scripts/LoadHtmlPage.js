function addItemsToCart(){
    const addCartToButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart-icon .cartItems');
    const cartItemsList = document.querySelector('.cart-tems');
    const cartTotal = document.querySelector('.cart-total');

    let cartItems = [];
    let TotalCartQuantity = 0;
    let totalAmount = 0;
    addCartToButtons.forEach((item, index) => {
        item.addEventListener('click', () => {
            const item = {
                product_image: document.querySelectorAll('.subMenuImages')[index].currentSrc,
                name: document.querySelectorAll('.itemTitle')[index].textContent,
                price: parseFloat(document.querySelectorAll('.price')[index].textContent.slice(1)
            ),
            quantity:1,
            };
            var foundIndex = cartItems.findIndex(
                (cartItem) => cartItem.name == item.name
            );
            if(foundIndex!=-1){
                cartItems[foundIndex].quantity++;
                TotalCartQuantity++;
            }
            else{
                cartItems.push(item);
                TotalCartQuantity++
            }
            totalAmount += item.price;
            UpdateCartUI();
        });
        function UpdateCartUI(){
            updateCartItemCount();
            updateCartItemList();
            updateCartTotal();
        }
        function updateCartItemCount(){
            cartItemCount.textContent = TotalCartQuantity;
        }
        function updateCartItemList(){
            cartItemsList.innerHTML = '';
            cartItems.forEach((item, index) => {
                const shoppingCartItem = document.createElement('div');
                shoppingCartItem.classList.add('cart-item', 'individual-cart-item');
                shoppingCartItem.innerHTML = `
                <span><img src='${item.product_image}' class="cart-product-image"></span>
                <span>(${item.quantity}x)${item.name}</span>
                <button class="remove-btn pull-right removeBtn" data-index="${index}">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
                <span class="cart-item-price pull-right">${(item.price * item.quantity).toFixed(2)}</span>
                `;
            cartItemsList.append(shoppingCartItem);
            });
            const removeButtons = document.querySelectorAll('.remove-btn');
            removeButtons.forEach((item) => {
                item.addEventListener('click', (event) =>{
                    const index = event.currentTarget.dataset.index;
                    removeItemFromCart(index);
                });
            });
        }  
        function removeItemFromCart(index){
            const removeItem = cartItems.splice(index,1)[0];
            TotalCartQuantity = TotalCartQuantity-removeItem.quantity;
            totalAmount -= removeItem.price * removeItem.quantity;
            UpdateCartUI();
        }
        function updateCartTotal(){
            cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
        }  
    })
}

function mainMenuElements (element, index, arr){
    arr[index] = document.querySelector('#mainMenuInfo').innerHTML +=
    `<div class="card MainMenu col-4">
        <img src=${element.ItemImage} class="card-img-top menuImages" alt="..."
            data-bs-toggle="collapse" data-bs-target="#${element.ItemName.toLowerCase()}" 
            aria-expanded="false">
        <div class="card-body">
            <h5 class="card-title">${element.ItemName}</h5>
            <p class="card-text">${element.ItemDescription}</p>
        </div>
    </div>`
}

function SubMenuElements(element, index, arr){
    arr[index] = document.querySelector('#'+element.ItemId).innerHTML +=
        `<div class="col-2 mb-3 foodMenuItem ${element.ItemType}">
            <h6 class="itemTitle">${element.ItemName}</h6>
            <img src=${element.ItemImage} class="subMenuImages" alt="...">
            <div class="mt-3">
                <span class="price">${element.ItemPrice}</span>
                <i class="fa fa-plus add-to-cart pull-right" aria-hidden="true"></i>
            </div>
        </div>`
        attachClickEvent();
}

function attachClickEvent(){
    const addCartToButtons = document.querySelectorAll('.add-to-cart');
    addCartToButtons.forEach((item) => {
        item.setAttribute("onClick", addItemsToCart());
    })
}

const urls = [
    'https://sivapriyapeta.github.io/food_application_api/menu.json',
    'https://sivapriyapeta.github.io/food_application_api/biryanisMenu.json',
    'https://sivapriyapeta.github.io/food_application_api/tiffinsMenu.json',
    'https://sivapriyapeta.github.io/food_application_api/thalisMenu.json',
    'https://sivapriyapeta.github.io/food_application_api/beveragesMenu.json',
    'https://sivapriyapeta.github.io/food_application_api/sweetsMenu.json',
    'https://sivapriyapeta.github.io/food_application_api/icecreamsMenu.json'
];

Promise.all(urls.map(url =>
        fetch(url, {cache: 'no-store'})
            .then(checkStatus)  // check the response of our APIs
            .then(parseJSON)    // parse it to Json
            .catch(error => console.log('There was a problem!', error))
        ))
        .then(data => { console.log(data)
            data[0].Main_Menu.forEach(mainMenuElements)
            data[1].Sub_Menu.forEach(SubMenuElements);
            data[2].Sub_Menu.forEach(SubMenuElements);
            data[3].Sub_Menu.forEach(SubMenuElements);
            data[4].Sub_Menu.forEach(SubMenuElements);
            data[5].Sub_Menu.forEach(SubMenuElements);
            data[6].Sub_Menu.forEach(SubMenuElements);
        })
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function parseJSON(response) {
    return response.json();
}

document.addEventListener('DOMContentLoaded', () => {
const categoryCheckboxes = document.querySelectorAll(".category-filter");

categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', updateProducts);
});

function updateProducts(){
    const products = document.querySelectorAll(".foodMenuItem");
    products.forEach((product) => {
            product.classList.remove('filtered');
            product.classList.remove('displayed');
    }); 
    let filteredProducts = products;
    const selectedCategories = Array.from(categoryCheckboxes)
    .filter((checkbox) =>  checkbox.checked)
    .map((checkbox) => checkbox.value);
    let productSelector = '.foodMenuItem';
    if(selectedCategories.length !=0){
        productSelector+= ':where(.' + selectedCategories.join(', .') +')'
    }
    filteredProducts = document.querySelectorAll(productSelector);
    filteredProducts.forEach((filteredProduct) => {
        if(!filteredProduct.classList.contains('displayed')){
            filteredProduct.classList.add('displayed');
        }
    }); 
    products.forEach((product) => {
        if(!product.classList.contains('displayed'))
            product.classList.add('filtered');
        else{
            product.classList.remove('filtered');
        }
    }); 
}
});

function loginFormValidation(x){
    var formInputs = document.getElementsByTagName("input");
    if(x.id == "email"){
        ValidateEmail(x.id, formInputs);
    }
    else if(x.id == "password"){
        ValidatePassword(x.id, formInputs);
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
function ValidatePhoneNumber(elementId, formInputs){
    var phoneNumber = document.getElementById(elementId);
    var phonenumberRegExPattern = /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/;
    if(!phonenumberRegExPattern.test(phoneNumber.value) || phoneNumber === ""){
        phoneNumber.classList.add("inValid");
        phoneNumber.classList.remove("valid");
        phoneNumber.insertAdjacentHTML("afterend", `<span id="phoneValidationMessage">Invalid Phone No!</span>`);
        document.getElementById("phoneValidationMessage").style.display = "block";
        document.getElementById("loginButton").disabled = true;
    }
    else{
        phoneNumber.classList.remove("inValid");
        phoneNumber.classList.add("valid");
        var errorMessage = document.getElementById("phoneValidationMessage");
        if(errorMessage!=null){
            document.getElementById("phoneValidationMessage").style.display = "none";
        };
        if(!formInputs.email.classList.contains("inValid") && formInputs.email.value.length > 0 ){
            document.getElementById("loginButton").disabled = false;
        }
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

function registerSubmit(event){
    event.preventDefault();
    var registerEmail = document.getElementById('registerEmail').value;
    var registerName = document.getElementById('registerName').value;
    var registerPassword = document.getElementById('registerPassword').value;
    var registerPhone = document.getElementById('registerPhone').value;
    var validationErrors = [];

    if(registerName == ""){
        document.getElementById('registerName')
        .insertAdjacentHTML('afterend', 
            `<span id="registerNameErrorMessage" style="display: none;">Name is Invalid!</span>`);
        document.getElementById("registerNameErrorMessage").style.display = "block";
        validationErrors.push("registerNameError");
    }
    else if(document.getElementById("registerNameErrorMessage")!=null){
        document.getElementById("registerNameErrorMessage").style.display = "none";
    }
    var emailRegExPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(registerEmail == "" || !emailRegExPattern.test(registerEmail)){
        document.getElementById('registerEmail')
        .insertAdjacentHTML('afterend', 
            `<span id="registerEmailErrorMessage" style="display: none;">Email is Invalid!</span>`);
        document.getElementById("registerEmailErrorMessage").style.display = "block";
        validationErrors.push("registerEmailError");
    }
    else if(document.getElementById("registerEmailErrorMessage")!=null){
        document.getElementById("registerEmailErrorMessage").style.display = "none";
    }
    if(registerPassword == "" || registerPassword.length<8){
        document.getElementById('registerPassword')
        .insertAdjacentHTML('afterend', 
            `<span id="registerPasswordErrorMessage" style="display: none;">Password Should be min 8 characters!</span>`);
        document.getElementById("registerPasswordErrorMessage").style.display = "block";
        validationErrors.push("registerPasswordError");
    }
    else if(document.getElementById("registerPasswordErrorMessage")!=null){
        document.getElementById("registerPasswordErrorMessage").style.display = "none";
    }
    var phonenumberRegExPattern = /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/;
    if(registerPhone == "" || !phonenumberRegExPattern.test(registerPhone)){
        document.getElementById('registerPhone')
        .insertAdjacentHTML('afterend', 
            `<span id="registerPhoneErrorMessage" style="display: none;">Phone Number is invalid!</span>`);
        document.getElementById("registerPhoneErrorMessage").style.display = "block";
        validationErrors.push("registerPhoneError");
    }
    else if(document.getElementById("registerPhoneErrorMessage")!=null){
        document.getElementById("registerPhoneErrorMessage").style.display = "none";
    }

    if(validationErrors.length === 0){
        document.getElementById("SignupButton").insertAdjacentHTML('afterend', 
            `<span id="resitrationSuccessMessage" class="mt-3" style="display: none; color:#198754">Registration Successful!</span>`);
        document.getElementById("resitrationSuccessMessage").style.display = "block";
    }
}

function loginSubmit(){
    var loginName = document.getElementById("email").value;
    document.getElementById("loginName").innerHTML = loginName;
    document.getElementById('loginButton').insertAdjacentHTML('afterend', `<span id="successMessage" class="mt-5" style="display: none; color:#198754">Login Successful!</span>`)
    document.getElementById("successMessage").style.display = "block";
}