document.addEventListener('DOMContentLoaded', function() {
    console.log("carrito.js cargado");

    // Verificar en qué página estamos
    const isProductsPage = document.querySelector('.products') !== null;
    const isCartPage = document.querySelector('.producto') !== null;
    
    // Obtener todos los botones de "Agregar al carrito"
    const addToCartButtons = document.querySelectorAll('.add-shipping-cart');
    let cart = [];

   // Función para mostrar los productos en el carrito
    function displayCartOnCartPage() {
        // Obtener el contenedor del carrito
        const cartContainer = document.getElementById('cart-container');
        // Verificar si el contenedor existe antes de continuar
        if (cartContainer) {
            // Limpiar el contenido actual del contenedor del carrito
            cartContainer.innerHTML = '';
            // Obtener el carrito del Local Storage
            const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

            // Actualizar el array cart con el carrito recuperado
            cart = savedCart;
            // Iterar sobre el array cart y generar HTML para cada producto
            cart.forEach((product,index) => {
                const productElement = document.createElement('div');
                productElement.classList.add('cart-item');

                const productImage = document.createElement('img');
                productImage.src = product.img;
                productImage.alt = product.name;
                productImage.classList.add('cart-img');

                const productName = document.createElement('p');
                productName.textContent = product.name;
                productName.classList.add('cart-name');

                const productPrice = document.createElement('p');
                productPrice.textContent = `$${product.price}`;
                productPrice.classList.add('cart-price');

                // Agregar un ícono y funcionalidad para eliminar el producto
                const deleteIcon = document.createElement('i');
                deleteIcon.classList.add('fa-regular', 'fa-trash-can');
                deleteIcon.addEventListener('click', () => {
                    removeFromCart(index);
                });

                // Agregar los elementos al contenedor del producto
                productElement.appendChild(productImage);
                productElement.appendChild(productName);
                productElement.appendChild(productPrice);
                productElement.appendChild(deleteIcon);


                // Agregar el producto al contenedor del carrito
                cartContainer.appendChild(productElement);
            });
        }
    }

    // Función para agregar el producto al carrito
    function addToCart(name, price, img) {
        const product = {
            img: img,
            name: name,
            price: price,
        };

        console.log("Imagen del producto:", name);

        // Obtener el carrito del Local Storage y agregar el nuevo producto
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = savedCart;
        cart.push(product);

        // Guardar el carrito actualizado en el Local Storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Actualizar la visualización del carrito en la página del carrito
        displayCartOnCartPage();
    }

        // Lógica específica para la página del carrito
        if (isCartPage) {
            // Obtener el carrito del Local Storage y mostrarlo en la página del carrito
            displayCartOnCartPage();
        }

        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Obtener información del producto
                const name = button.getAttribute('data-name');
                const price = parseFloat(button.getAttribute('data-price'));
                const img = button.getAttribute('data-img');

                // Agregar el producto al carrito
                addToCart(name, price, img);

                button.innerHTML = '<i class="fas fa-check"></i>'
                
            });
        });

        // Función para eliminar un producto del carrito
        function removeFromCart(index) {
            // Remover el producto del array cart
            cart.splice(index, 1);
            // Actualizar el carrito en el Local Storage
            localStorage.setItem('cart', JSON.stringify(cart));
            // Volver a mostrar el carrito actualizado
            displayCartOnCartPage();
        }

    });