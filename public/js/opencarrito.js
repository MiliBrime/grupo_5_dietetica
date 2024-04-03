document.addEventListener('DOMContentLoaded', function() {
    const toggleCartButton = document.getElementById('toggle-cart-button');
    const cartContainer = document.querySelector('.carrito');

    toggleCartButton.addEventListener('click', function() {
        cartContainer.classList.toggle('cart-open'); 

        if (cartContainer.classList.contains('cart-open')) {
            cartContainer.style.right = '0';
        } else { 
            cartContainer.style.right = '-400px'; 
        }
    });

    // Cierra el carrito si se hace clic fuera de él
    document.addEventListener('click', function(event) {
        if (!cartContainer.contains(event.target) && !toggleCartButton.contains(event.target)) {
            cartContainer.classList.remove('cart-open');
            cartContainer.style.right = '-400px';
        }
    });
});