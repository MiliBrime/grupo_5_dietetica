document.addEventListener('DOMContentLoaded', function() {
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
        const emptyCartMessage = document.getElementById('empty-cart-message');

        // Verificar si el contenedor existe antes de continuar
        if (cartContainer) {
            // Limpiar el contenido actual del contenedor del carrito
            cartContainer.innerHTML = '';
            // Obtener el carrito del Local Storage
            const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

            // Actualizar el array cart con el carrito recuperado
            cart = savedCart;
            let totalPrice = 0; // Variable para almacenar la suma de los precios
    
            // Iterar sobre el array cart y generar HTML para cada producto
            cart.forEach((product,index) => {
                const productElement = document.createElement('div');
                productElement.classList.add('cart-item');
    
                // Imagen del producto 
                const productImage = document.createElement('img');
                productImage.src = product.img;
                productImage.alt = product.name;
                productImage.classList.add('cart-img');

                // Nombre del producto
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
    
                // Sumar el precio del producto al total
                totalPrice += product.price;
            });
    
            // Mostrar el total en el HTML
            const totalElement = document.getElementById('total');
            if (totalElement) {
                totalElement.textContent = `$${totalPrice.toFixed(2)}`;
            }
        }
    }

    // Función para agregar el producto al carrito
    function addToCart(name, price, img, quantity = 1) {
        const product = {
            img: img,
            name: name,
            price: price,
            quantity: quantity  // Agregar la cantidad al objeto del producto
        };
    
        // Obtener el carrito del Local Storage y agregar el nuevo producto
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = savedCart;
    
        // Verificar si el producto ya está en el carrito
        const existingProductIndex = cart.findIndex(item => item.name === name);
    
        if (existingProductIndex !== -1) {
            // Si el producto ya está en el carrito, actualizar la cantidad
            cart[existingProductIndex].quantity += quantity;
        } else {
            // Si el producto no está en el carrito, agregarlo al carrito
            cart.push(product);
        }
    
        // Guardar el carrito actualizado en el Local Storage
        localStorage.setItem('cart', JSON.stringify(cart));
    
        // Actualizar la visualización del carrito en la página del carrito
        displayCartOnCartPage();
    
        // Actualizar el contador del carrito
        updateCartCounter();
    }
    // Función para eliminar un producto del carrito
    function removeFromCart(index) {
        // Remover el producto del array cart
        cart.splice(index, 1);
        // Actualizar el carrito en el Local Storage
        localStorage.setItem('cart', JSON.stringify(cart));
        // Volver a mostrar el carrito actualizado
        displayCartOnCartPage();
        // Actualizar el contador del carrito
        updateCartCounter();
    }

    // Función para actualizar el contador del carrito
    function updateCartCounter() {
        const cartCounter = document.getElementById('cart-counter');
        if (cartCounter) {
            const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
            cartCounter.textContent = savedCart.length;
        }
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

    // Llamar a updateCartCounter() al cargar la página para actualizar el contador
    updateCartCounter();

});