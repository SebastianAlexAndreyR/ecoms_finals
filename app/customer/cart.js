(function() {
    var loginHelper = new LoginHelper();
    var localStorageHelper = new LocalStorageHelper();

    (function() {
        loginHelper.validLoggedIn();

        if (loginHelper.isLoggedInAsAdmin()) {
            loginHelper.redirectToSellerPage();
        }
    })();

    loadCart = function() {
        var allCarts = localStorageHelper.getList("cart");
        var userCarts = allCarts.filter(function(cart) {
            return cart.userEmail == loginHelper.getUserEmail() && !cart.isCheckedOut;
        });

        var allProducts = localStorageHelper.getList("products");

        var cartItems = "";
        userCarts.forEach(cart => {
            var productInfo = allProducts.find(function(product) {
                return product.id == cart.productId;
            });

            cartItems += `<li>${productInfo.name} | ${productInfo.price} | <button onclick="onCheckout(${cart.id})">Checkout</button></li>`
        });

        document.getElementById("cartItems").innerHTML = cartItems;
    }

    loadCheckedoutItems = function() {
        var allCarts = localStorageHelper.getList("cart");
        var userCarts = allCarts.filter(function(cart) {
            return cart.userEmail == loginHelper.getUserEmail() && cart.isCheckedOut;
        });

        var allProducts = localStorageHelper.getList("products");

        var cartItems = "";
        userCarts.forEach(cart => {
            var productInfo = allProducts.find(function(product) {
                return product.id == cart.productId;
            });

            cartItems += `<li>${productInfo.name} | ${productInfo.price} | <button onclick="onUndoCheckout(${cart.id})">Undo Checkout</button></li>`
        });

        document.getElementById("checkedOutItems").innerHTML = cartItems;
    }

    onCheckout = function(cartId) {
        var cart = localStorageHelper.getById("cart", cartId);
        cart.isCheckedOut = true;
        localStorageHelper.update("cart", cart);

        loadCart();
        loadCheckedoutItems();
    }

    onUndoCheckout = function(cartId) {
        var cart = localStorageHelper.getById("cart", cartId);
        cart.isCheckedOut = false;
        localStorageHelper.update("cart", cart);

        loadCart();
        loadCheckedoutItems();
    }

    loadCart();
    loadCheckedoutItems();
})();