function confirmDelete(userId) {
    if (confirm('¿Estás seguro que deseas eliminar el usuario?')) {
        document.getElementById('deleteForm_' + userId).submit();
    }
}