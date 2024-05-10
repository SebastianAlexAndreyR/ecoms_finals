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

        if (product.image) {
            document.getElementById("imgholder").src = product.image;
            document.getElementById("imgholder").hidden = false;
        }
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

        if (!document.getElementById("imgholder").src) {
            alert("Input image");
            return;
        }

        var updatedProduct = {
            name: name,
            price: price,
            image: document.getElementById("imgholder").src,
            id: id
        }


        localStorageHelper.update("products", updatedProduct);
        location.href="../seller/index.html";
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

    onLoad();
})();