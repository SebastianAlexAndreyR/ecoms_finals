
localStorageHelper = new LocalStorageHelper();
loginHelper = new LoginHelper();

// Function to register a new user
function registerUser(email, password) {
    // Check if the user already exists
    if (localStorage.getItem(email)) {
        return false; // User already exists
    } else {
        // Create a new user object
        const newUser = { email: email, password: password };
        // Store the user object in localStorage
        localStorage.setItem(email, JSON.stringify(newUser));
        return true; // Registration successful
    }
}

// Function to authenticate a user
function loginUser(email, password) {
    //default admin user

    if (email == "admin") {
        if (password == "admin") {
            return true;
        } else {
            return false;
        }        
    }

    // Retrieve the user object from localStorage

    var allUsers = this.localStorageHelper.getList('users');

    var currentUser = allUsers.find(function(user){
        return user.email == email && user.password == password
    });
    
    // Check if the user exists and the password is correct
    if (currentUser) {
        return true; // Authentication successful
    } else {
        return false; // Authentication failed
    }
    
}
// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     let email = document.getElementById('email').value;
//     let password = document.getElementById('password').value;
//     // Attempt to log in the user
//     if (loginUser(email, password)) {
//         alert('Login successful!');
//         // Redirect to dashboard or homepage
//     } else {
//         document.getElementById('loginError').innerText = 'Invalid email or password';
//     }

// });   

// Function to handle successful login
function handleLogin(email) {
    // Store the logged-in user's email in localStorage to indicate that the user is logged in
    localStorage.setItem('loggedInUser', email);
    // Redirect to the eCommerce page
    window.location.href = ""; // Replace "ecommerce.html" with the actual URL of your eCommerce page
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    // Attempt to log in the user
    if (loginUser(email, password)) {
        alert('Login successful!');
        handleLogin(email); // Redirect to eCommerce page upon successful login
    } else {
        document.getElementById('loginError').innerText = 'Invalid email or password';
    }
});


// Check if the user is already logged in
window.onload = function() {
    if (loginHelper.isLoggedInAsAdmin()) {
        // Redirect to the eCommerce page if the user is already logged in
        loginHelper.redirectToSellerPage();
    } else if (loginHelper.isLoggedInAsUser()) {
        loginHelper.redirectToCustomerPage();
    }
};