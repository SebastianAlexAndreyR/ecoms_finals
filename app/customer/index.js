(function() {
    var localStorageHelper = new LocalStorageHelper();

    loadProducts = function () {
        var products = localStorageHelper.getList("products");
        
        var content = `<table>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th></th>
                            <th></th>
                        </tr>
                        `;
        products.forEach(product => {
            content += `<tr>
                            <td>${product.name}</td>
                            <td>${product.price}</td>
                            <td><a href="../customer/update-product.html?id=${product.id}">Update</a><td>
                            <td><a href="javascript:void(0)" onclick="onDeleteProduct(${product.id}, '${product.name}')">X</a><td>
                        </tr>`;

        });

        content += "</table>";
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
})();