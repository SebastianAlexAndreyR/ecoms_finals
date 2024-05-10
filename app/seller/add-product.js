(function () {

    (function() {
        var loginHelper = new LoginHelper();
        loginHelper.validLoggedIn();

        if (loginHelper.isLoggedInAsUser()) {
            loginHelper.redirectToCustomerPage();
        }
    })();
    
    localStorageHelper = new LocalStorageHelper();

    onAdd = function () {
        var name = document.getElementById("name").value;
        var price = document.getElementById("price").value;       

        //Validations
        if (!name) {
            alert("Name must not be empty");
            return;
        }

        if (!price || price <= 0) {
            alert("Price must be greater than zero");
            return;
        }

        
        if (!document.getElementById("imgholder").src) {
            alert("Input image");
            return;
        }

        var newProduct = {
            name: name,
            price: price,
            image: document.getElementById("imgholder").src
        }

        this.localStorageHelper.add("products", newProduct);
        location.href = "../seller/index.html";
    }

    uploadImage = function(event) {
        var reader = new FileReader();
        reader.onload = function() {
            var imgholder = document.getElementById("imgholder");
            
            imgholder.src = reader.result;
            imgholder.hidden = false;
        }

        reader.readAsDataURL(event.target.files[0]);
    }
})();

onDeleteProduct = function (id, name) {
    var ok = confirm(`Are you sure you want to delete ${name}`);

    if (ok) {
        this.localStorageHelper.deleteItem("products", id);
        this.loadProducts();
    }
}