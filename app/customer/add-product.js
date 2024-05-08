(function(){

    var localStorageHelper = new LocalStorageHelper();

    onAdd = function() {       
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

        var newProduct = {
            name: name,
            price: price
        }

        localStorageHelper.add("products", newProduct);
        location.href="../customer/index.html";
    }
})();