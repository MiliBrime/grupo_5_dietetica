console.log("conectadooooooooo register");

window.addEventListener("load", function() {
    let formulario = document.querySelector(".input-group");
    let errores = [];

    // Función para validar el campo de nombre
    function validarNombre() {
        let name = document.getElementById("first_name").value.trim();
        if (name == "") {
            errores.push("Nombre vacío");
            document.getElementById("error-first_name").innerText = "Ingresa tu nombre"}
            else if(name.length < 2){
                errores.push("Nombre menor a 2 caracteres");
                document.getElementById("error-first_name").innerText = "Tu nombre debe tener al menos 2 caracteres";
            }
        else {
            document.getElementById("error-first_name").innerText = "";
        }
    }
    // Función para validar el campo de apellido
    function validarApellido() {
        let lastName = document.getElementById("last_name").value.trim();
        if (lastName == "") {
            errores.push("Apellido vacío");
            document.getElementById("error-last_name").innerText = "Ingresa tu apellido"}
            else if(lastName.length < 2){
                errores.push("Apellido menor a 2 caracteres");
                document.getElementById("error-last_name").innerText = "Tu apellido debe tener al menos 2 caracteres";
            }
        else {
            document.getElementById("error-last_name").innerText = "";
        }
    }
    // Función para validar el campo de email
    function validarEmail() {
        let email = document.getElementById("email").value.trim();
        if (email == "") {
            errores.push("Email vacío");
            document.getElementById("error-email").innerText = "Ingresa tu email"
            return false;
        } else {
                let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if(!regex.test(email)){
                    errores.push("Email invalido");
                    document.getElementById("error-email").innerText = "Ingresa un email válido";
                    return false;
                } else {
                    document.getElementById("error-email").innerText = "";
                    return true;
                }

            }       
    }
    // Función para validar el campo de telefono
    function validarTelefono() {
        let phone = document.getElementById("phone").value.trim();
        if (phone == "") {
            errores.push("Teléfono vacío");
            document.getElementById("error-phone").innerText = "Ingresa tu teléfono"}
            else if(phone.length < 9){
                errores.push("Teléfono menor a 9 caracteres");
                document.getElementById("error-phone").innerText = "Tu teléfono debe tener al menos 9 caracteres";
            }
        else {
            document.getElementById("error-phone").innerText = "";
        }
    }
    // Función para validar el campo de contraseña
    function validarContrasenia() {
        let password = document.getElementById("password").value.trim();
        if (password == "") {
            errores.push("Contraseña vacía");
            document.getElementById("error-password").innerText = "Ingresa tu contraseña"}
            else if(password.length < 8){
                errores.push("Contraseña menor a 8 caracteres");
                document.getElementById("error-password").innerText = "Tu contraseña debe tener al menos 8 caracteres";
            }
        else {
            document.getElementById("error-password").innerText = "";
        }
    }

    function validarFoto() {
        let fileInput = document.getElementById("photo");
        let errorMessage = document.getElementById("error-photo");
        let acceptedExtensions = [".jpg", ".png", ".gif", ".jpeg"];
    
        // Verificar si se ha seleccionado un archivo
        if (fileInput.files.length > 0) {
            let fileExtension = fileInput.files[0].name.substring(fileInput.files[0].name.lastIndexOf(".")).toLowerCase();
            if (!acceptedExtensions.includes(fileExtension)) {
                errores.push("Extensión de archivo no válida");
                errorMessage.innerText = `Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`;
            } else {
                errorMessage.innerText = "";
            }
        } else {
            // Limpiar el mensaje de error si no se ha seleccionado ningún archivo
            errorMessage.innerText = "";
        }
    }

    // Escuchar eventos
    document.getElementById("first_name").addEventListener("input", validarNombre);
    document.getElementById("last_name").addEventListener("input", validarApellido);
    document.getElementById("email").addEventListener("input", validarEmail);
    document.getElementById("phone").addEventListener("input", validarTelefono);
    document.getElementById("password").addEventListener("input", validarContrasenia);
    document.getElementById("photo").addEventListener("change", validarFoto);

    formulario.addEventListener("submit", function(e) {
        errores = [];
    
        // Validación de los campos al enviar el formulario
        validarNombre();
        validarApellido();
        validarEmail();
        validarTelefono();
        validarContrasenia();
        validarFoto();
    
        // Evitar que el formulario se envíe si hay errores
        if (errores.length > 0) {
            e.preventDefault();
    
            for (let i = 0; i < errores.length; i++) {
                console.log(errores[i]);
            }
        }
    });
});