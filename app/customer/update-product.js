(function(){

    var localStorageHelper = new LocalStorageHelper();

    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');

    onLoad = function() {
        var product = localStorageHelper.getById("products", id);

        if (!product)
            alert("Prodcut not be found!");

        document.getElementById("name").value = product.name;
        document.getElementById("price").value = product.price;

    }

    onUpdate = function() {
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

        var updatedProduct = {
            name: name,
            price: price,
            id: id
        }


        localStorageHelper.update("products", updatedProduct);
        location.href="../customer/index.html";
    }

    onLoad();
})();