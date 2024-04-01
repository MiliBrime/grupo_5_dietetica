function confirmDelete() {
    if (confirm('¿Estás seguro que deseas eliminar el producto?')) {
        document.getElementById('deleteForm').submit();
    }
}