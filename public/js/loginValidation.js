console.log("conectadooooooooo login");

window.addEventListener("load", function() {
    let formulario = document.querySelector(".input-group");
    let errores = [];

    function validarEmail() {
        let email = document.getElementById("logEmail").value.trim();
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

    function validarContrasenia() {
        let password = document.getElementById("logPassword").value.trim();
        if (password == "") {
            errores.push("Contraseña vacía");
            document.getElementById("error-password").innerText = "Ingresa tu contraseña"
        } else {
            document.getElementById("error-password").innerText = "";
        }
    }

    // Escuchar el evento 'input' en el campo de email
    document.getElementById("logEmail").addEventListener("input", validarEmail);
    // Escuchar el evento 'input' en el campo de contraseña
    document.getElementById("logPassword").addEventListener("input", validarContrasenia);

    formulario.addEventListener("submit", function(e) {
        errores = [];

        validarEmail();
        validarContrasenia();
        
        // Mostrar errores si los hay
        if (errores.length > 0) {
            e.preventDefault();

            for (let i = 0; i < errores.length; i++) {
                console.log(errores[i]);
            }
        }
    });
});