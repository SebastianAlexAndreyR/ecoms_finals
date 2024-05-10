(function() {
    (function() {
        var loginHelper = new LoginHelper();
        loginHelper.validLoggedIn();

        if (loginHelper.isLoggedInAsUser()) {
            loginHelper.redirectToCustomerPage();
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
   
                    <a href="../seller/update-product.html?id=${product.id}" class="action-button">Update</a>
                    <a href="#" class="action-button delete-button" onclick="onDeleteProduct(${product.id}, '${product.name}')">Delete</a>
                </div>
            </div>
        `;

        });

        content += "</div>";
        document.getElementById('products').innerHTML = content;
    }

    onDeleteProduct = function(id, name) {
        var ok = confirm(`Are you sure you want to delete ${name}`);

        if (ok) {
            localStorageHelper.deleteItem("products", id);
            this.loadProducts();
        }
    }

    loadProducts();

    onLogOut = function() {
        var loginHelper = new LoginHelper();
        loginHelper.logOut();
    }
})();