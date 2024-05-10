(function () {
    (function() {
        var loginHelper = new LoginHelper();
        loginHelper.validLoggedIn();

        if (loginHelper.isLoggedInAsAdmin()) {
            loginHelper.redirectToSellerPage();
        }
    })();

    var localStorageHelper = new LocalStorageHelper();

    loadProducts = function () {
        var products = localStorageHelper.getList("products");

        var content = `<div class="product-cards">`;
        products.forEach(product => {
            content += `
            <div class="product-card">
            <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3><br>
                    <p class="product-price">${product.price}</p>
                    
                </div>
                <div class="product-actions">
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;

        });

        content += "</div>";
        document.getElementById('products').innerHTML = content;
    }


    // Function to add a product to the cart
    addToCart = function (productId) {
        var loginHelper = new LoginHelper();
        

        var product = this.getProductById(productId);
        if (product) {
            var newCart = {
                productId: product.id,
                userEmail: loginHelper.getUserEmail()
            };

            localStorageHelper.add("cart", newCart);

            alert("Product added to cart successfully!");
        }
    }

    // Function to update the cart page display
    var updateCartPage = function () {
        var cartItems = localStorageHelper.getList("cart");
        var cartContent = "<div class='cart-items'><h2>Cart Items</h2><ul>";
        cartItems.forEach(item => {
            cartContent += `<li>${item.name} - ${item.price}</li>`;
        });
        cartContent += "</ul></div>";
        document.getElementById('cart').innerHTML = cartContent;
    }

    // Function to get a product by its ID
    getProductById = function (productId) {
        var products = localStorageHelper.getList("products");
        
        return products.find(product => product.id == productId);
    }


    onDeleteProduct = function (id, name) {
        var ok = confirm(`Are you sure you want to delete ${name}`);

        if (ok) {
            localStorageHelper.deleteItem("products", id);
            this.loadProducts();
        }
    }

    onLogOut = function() {
        var loginHelper = new LoginHelper();
        loginHelper.logOut();
    }


    loadProducts();
})();