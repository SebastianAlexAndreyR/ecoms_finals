class LoginHelper {
    isLoggedInAsAdmin = function () {
        return localStorage.getItem("loggedInUser") == "admin"
    }

    isLoggedInAsUser = function () {
        return !!localStorage.getItem("loggedInUser")
            && localStorage.getItem("loggedInUser") != "admin"
    }

    validLoggedIn = function () {
        if (!localStorage.getItem("loggedInUser")) {
            this.redirectToLoginPage();
        }
    }

    getUserEmail = function() {
        return localStorage.getItem("loggedInUser");
    }

    logOut = function() {
        localStorage.removeItem("loggedInUser");
        this.redirectToLoginPage();
    }

    redirectToSellerPage = function () {
        this.redirectTo("app/seller/index.html");
    }

    redirectToCustomerPage = function () {
        this.redirectTo("app/customer/index.html");
    }

    redirectToLoginPage = function () {
        this.redirectTo("logins/login.html");
    }

    redirectTo = function(url) {
        var newLocation = location.href.substring(0, location.href.indexOf("ecoms")) + "ecoms/" + url;
        location = newLocation;
    }
}